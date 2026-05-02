import { Router } from 'express';
import pool from '../config/db.js';
import { generateOrderId, generateDocketNumber, generateOTP } from '../utils/orderIdGenerator.js';

const router = Router();

// GET /api/redemptions — Fetch all redemptions for user (with gift info + status log)
router.get('/', async (req, res, next) => {
  try {
    const userId = req.query.user_id || 1;

    const { rows } = await pool.query(
      `SELECT r.id, r.order_id, r.docket_number, r.otp, r.status, r.points_spent,
              r.created_at, r.updated_at,
              g.name as gift_name, g.image as gift_image, g.category as gift_category,
              g.points as gift_points, g.color as gift_color, g.description as gift_description
       FROM redemptions r
       JOIN gifts g ON r.gift_id = g.id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/redemptions/:orderId/track — Full tracking info for a single order
router.get('/:orderId/track', async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const { rows } = await pool.query(
      `SELECT r.id, r.order_id, r.docket_number, r.otp, r.status, r.points_spent,
              r.created_at, r.updated_at,
              g.name as gift_name, g.image as gift_image, g.category as gift_category,
              g.points as gift_points, g.color as gift_color
       FROM redemptions r
       JOIN gifts g ON r.gift_id = g.id
       WHERE r.order_id = $1`,
      [orderId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const { rows: statusLog } = await pool.query(
      `SELECT status, note, created_at FROM redemption_status_log
       WHERE redemption_id = $1 ORDER BY created_at ASC`,
      [rows[0].id]
    );

    res.json({ ...rows[0], status_log: statusLog });
  } catch (err) {
    next(err);
  }
});

// POST /api/redemptions — Create a new redemption
router.post('/', async (req, res, next) => {
  const client = await pool.connect();
  try {
    const { gift_id, user_id = 1 } = req.body;

    if (!gift_id) {
      return res.status(400).json({ error: 'gift_id is required' });
    }

    // Verify gift exists
    const { rows: gifts } = await client.query('SELECT * FROM gifts WHERE id = $1', [gift_id]);
    if (gifts.length === 0) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    const gift = gifts[0];
    const orderId = generateOrderId();
    const docketNumber = generateDocketNumber();
    const otp = generateOTP();

    await client.query('BEGIN');

    // Create redemption
    const { rows } = await client.query(
      `INSERT INTO redemptions (user_id, gift_id, order_id, docket_number, otp, status, points_spent)
       VALUES ($1, $2, $3, $4, $5, 'redeemed', $6)
       RETURNING *`,
      [user_id, gift_id, orderId, docketNumber, otp, gift.points]
    );

    const redemption = rows[0];

    // Log initial status
    await client.query(
      `INSERT INTO redemption_status_log (redemption_id, status, note)
       VALUES ($1, 'redeemed', 'Gift redeemed by user')`,
      [redemption.id]
    );

    await client.query('COMMIT');

    res.status(201).json({
      id: redemption.id,
      order_id: redemption.order_id,
      docket_number: redemption.docket_number,
      otp: redemption.otp,
      status: redemption.status,
      gift_name: gift.name,
      points_spent: redemption.points_spent,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
});

export default router;
