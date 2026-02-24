import { Router } from 'express';
import pool from '../config/db.js';
import { generateOrderId, generateDocketNumber, generateOTP } from '../utils/orderIdGenerator.js';

const router = Router();

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
