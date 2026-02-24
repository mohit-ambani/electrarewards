import { Router } from 'express';
import pool from '../config/db.js';
import { getNextStatus, STATUS_FLOW } from '../utils/statusValidator.js';

const router = Router();

// GET /api/admin/dashboard — Status counts + summary
router.get('/dashboard', async (req, res, next) => {
  try {
    const { rows: statusCounts } = await pool.query(
      `SELECT status, COUNT(*)::int as count FROM redemptions GROUP BY status`
    );

    const { rows: totalRow } = await pool.query(
      `SELECT COUNT(*)::int as total, COALESCE(SUM(points_spent), 0)::int as total_points FROM redemptions`
    );

    const { rows: recent } = await pool.query(
      `SELECT r.*, g.name as gift_name, g.image as gift_image, g.category as gift_category
       FROM redemptions r JOIN gifts g ON r.gift_id = g.id
       ORDER BY r.created_at DESC LIMIT 10`
    );

    const counts = {};
    STATUS_FLOW.forEach(s => counts[s] = 0);
    statusCounts.forEach(r => counts[r.status] = r.count);

    res.json({
      counts,
      total: totalRow[0].total,
      total_points: totalRow[0].total_points,
      recent,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/redemptions — All redemptions with filters
router.get('/redemptions', async (req, res, next) => {
  try {
    const { status, category, search } = req.query;
    let query = `
      SELECT r.*, g.name as gift_name, g.image as gift_image, g.category as gift_category, g.points as gift_points
      FROM redemptions r JOIN gifts g ON r.gift_id = g.id
      WHERE 1=1
    `;
    const params = [];
    let paramIdx = 1;

    if (status && status !== 'all') {
      query += ` AND r.status = $${paramIdx++}`;
      params.push(status);
    }
    if (category && category !== 'all') {
      query += ` AND g.category = $${paramIdx++}`;
      params.push(category);
    }
    if (search) {
      query += ` AND (r.order_id ILIKE $${paramIdx} OR g.name ILIKE $${paramIdx})`;
      params.push(`%${search}%`);
      paramIdx++;
    }

    query += ' ORDER BY r.created_at DESC';

    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/redemptions/:id — Single redemption + status history
router.get('/redemptions/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      `SELECT r.*, g.name as gift_name, g.image as gift_image, g.description as gift_description,
              g.category as gift_category, g.points as gift_points, g.rating as gift_rating,
              u.name as user_name, u.email as user_email
       FROM redemptions r
       JOIN gifts g ON r.gift_id = g.id
       JOIN users u ON r.user_id = u.id
       WHERE r.id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Redemption not found' });
    }

    const { rows: statusLog } = await pool.query(
      `SELECT * FROM redemption_status_log WHERE redemption_id = $1 ORDER BY created_at ASC`,
      [id]
    );

    res.json({ ...rows[0], status_log: statusLog });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/redemptions/:id/status — Advance status
router.patch('/redemptions/:id/status', async (req, res, next) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const { note } = req.body;

    const { rows } = await client.query('SELECT * FROM redemptions WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Redemption not found' });
    }

    const redemption = rows[0];
    const nextStatus = getNextStatus(redemption.status);

    if (!nextStatus) {
      return res.status(400).json({ error: 'Redemption is already at final status' });
    }

    await client.query('BEGIN');

    await client.query(
      `UPDATE redemptions SET status = $1, updated_at = NOW() WHERE id = $2`,
      [nextStatus, id]
    );

    await client.query(
      `INSERT INTO redemption_status_log (redemption_id, status, note) VALUES ($1, $2, $3)`,
      [id, nextStatus, note || `Status advanced to ${nextStatus}`]
    );

    await client.query('COMMIT');

    res.json({ id: parseInt(id), previous_status: redemption.status, new_status: nextStatus });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
});

export default router;
