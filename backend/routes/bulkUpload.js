import { Router } from 'express';
import multer from 'multer';
import XLSX from 'xlsx';
import pool from '../config/db.js';
import { STATUS_FLOW } from '../utils/statusValidator.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

function parseExcel(buffer) {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet, { defval: '' });
}

function findColumn(row, candidates) {
  for (const key of Object.keys(row)) {
    const k = key.toLowerCase().trim();
    if (candidates.some(c => k.includes(c))) return key;
  }
  return null;
}

// POST /api/admin/bulk/dispatch — Mark orders as dispatched (in_transit)
router.post('/dispatch', upload.single('file'), async (req, res, next) => {
  const client = await pool.connect();
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const rows = parseExcel(req.file.buffer);
    if (rows.length === 0) return res.status(400).json({ error: 'Excel file is empty' });

    const orderIdCol = findColumn(rows[0], ['order_id', 'order id', 'orderid', 'order']);
    if (!orderIdCol) {
      return res.status(400).json({
        error: 'Could not find order ID column. Expected column name containing: order_id, order id, or order',
        columns: Object.keys(rows[0]),
      });
    }

    await client.query('BEGIN');

    let updated = 0;
    let skipped = 0;
    const errors = [];
    const targetStatus = 'in_transit';

    for (const row of rows) {
      const orderId = String(row[orderIdCol]).trim();
      if (!orderId) { skipped++; continue; }

      const { rows: existing } = await client.query(
        'SELECT id, status FROM redemptions WHERE order_id = $1', [orderId]
      );

      if (existing.length === 0) {
        errors.push({ order_id: orderId, reason: 'Order not found' });
        continue;
      }

      const redemption = existing[0];
      const currentIdx = STATUS_FLOW.indexOf(redemption.status);
      const targetIdx = STATUS_FLOW.indexOf(targetStatus);

      if (currentIdx >= targetIdx) {
        skipped++;
        continue;
      }

      // Jump to in_transit, logging intermediate steps
      const stepsToLog = STATUS_FLOW.slice(currentIdx + 1, targetIdx + 1);
      for (const step of stepsToLog) {
        await client.query(
          'INSERT INTO redemption_status_log (redemption_id, status, note) VALUES ($1, $2, $3)',
          [redemption.id, step, 'Bulk dispatch upload']
        );
      }

      await client.query(
        'UPDATE redemptions SET status = $1, updated_at = NOW() WHERE id = $2',
        [targetStatus, redemption.id]
      );
      updated++;
    }

    await client.query('COMMIT');

    res.json({
      message: `Dispatch processed: ${updated} updated, ${skipped} skipped, ${errors.length} errors`,
      updated,
      skipped,
      errors,
      total: rows.length,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
});

// POST /api/admin/bulk/docket — Assign docket numbers
router.post('/docket', upload.single('file'), async (req, res, next) => {
  const client = await pool.connect();
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const rows = parseExcel(req.file.buffer);
    if (rows.length === 0) return res.status(400).json({ error: 'Excel file is empty' });

    const orderIdCol = findColumn(rows[0], ['order_id', 'order id', 'orderid', 'order']);
    const docketCol = findColumn(rows[0], ['docket', 'docket_number', 'docket number', 'awb', 'tracking']);

    if (!orderIdCol || !docketCol) {
      return res.status(400).json({
        error: 'Could not find required columns. Need: order_id and docket_number (or awb/tracking)',
        columns: Object.keys(rows[0]),
      });
    }

    await client.query('BEGIN');

    let updated = 0;
    let skipped = 0;
    const errors = [];

    for (const row of rows) {
      const orderId = String(row[orderIdCol]).trim();
      const docketNumber = String(row[docketCol]).trim();
      if (!orderId || !docketNumber) { skipped++; continue; }

      const { rows: existing } = await client.query(
        'SELECT id FROM redemptions WHERE order_id = $1', [orderId]
      );

      if (existing.length === 0) {
        errors.push({ order_id: orderId, reason: 'Order not found' });
        continue;
      }

      await client.query(
        'UPDATE redemptions SET docket_number = $1, updated_at = NOW() WHERE id = $2',
        [docketNumber, existing[0].id]
      );
      updated++;
    }

    await client.query('COMMIT');

    res.json({
      message: `Docket update processed: ${updated} updated, ${skipped} skipped, ${errors.length} errors`,
      updated,
      skipped,
      errors,
      total: rows.length,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
});

// POST /api/admin/bulk/delivered — Mark orders as delivered
router.post('/delivered', upload.single('file'), async (req, res, next) => {
  const client = await pool.connect();
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const rows = parseExcel(req.file.buffer);
    if (rows.length === 0) return res.status(400).json({ error: 'Excel file is empty' });

    const orderIdCol = findColumn(rows[0], ['order_id', 'order id', 'orderid', 'order']);
    if (!orderIdCol) {
      return res.status(400).json({
        error: 'Could not find order ID column. Expected column name containing: order_id, order id, or order',
        columns: Object.keys(rows[0]),
      });
    }

    await client.query('BEGIN');

    let updated = 0;
    let skipped = 0;
    const errors = [];
    const targetStatus = 'delivered';

    for (const row of rows) {
      const orderId = String(row[orderIdCol]).trim();
      if (!orderId) { skipped++; continue; }

      const { rows: existing } = await client.query(
        'SELECT id, status FROM redemptions WHERE order_id = $1', [orderId]
      );

      if (existing.length === 0) {
        errors.push({ order_id: orderId, reason: 'Order not found' });
        continue;
      }

      const redemption = existing[0];
      if (redemption.status === targetStatus) {
        skipped++;
        continue;
      }

      const currentIdx = STATUS_FLOW.indexOf(redemption.status);
      const targetIdx = STATUS_FLOW.indexOf(targetStatus);
      const stepsToLog = STATUS_FLOW.slice(currentIdx + 1, targetIdx + 1);

      for (const step of stepsToLog) {
        await client.query(
          'INSERT INTO redemption_status_log (redemption_id, status, note) VALUES ($1, $2, $3)',
          [redemption.id, step, 'Bulk delivery upload']
        );
      }

      await client.query(
        'UPDATE redemptions SET status = $1, updated_at = NOW() WHERE id = $2',
        [targetStatus, redemption.id]
      );
      updated++;
    }

    await client.query('COMMIT');

    res.json({
      message: `Delivery processed: ${updated} updated, ${skipped} skipped, ${errors.length} errors`,
      updated,
      skipped,
      errors,
      total: rows.length,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
});

// GET /api/admin/bulk/template/:type — Download template Excel
router.get('/template/:type', (req, res) => {
  const { type } = req.params;
  const wb = XLSX.utils.book_new();
  let ws;

  if (type === 'dispatch' || type === 'delivered') {
    ws = XLSX.utils.aoa_to_sheet([['order_id'], ['ELR-2026-XXXXXX']]);
  } else if (type === 'docket') {
    ws = XLSX.utils.aoa_to_sheet([['order_id', 'docket_number'], ['ELR-2026-XXXXXX', 'AWB123456789']]);
  } else {
    return res.status(400).json({ error: 'Invalid template type' });
  }

  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=template_${type}.xlsx`);
  res.send(buffer);
});

export default router;
