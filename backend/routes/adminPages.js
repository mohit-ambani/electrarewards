import { Router } from 'express';
import pool from '../config/db.js';
import { getNextStatus, STATUS_FLOW } from '../utils/statusValidator.js';

const router = Router();

// GET /admin/dashboard
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

    res.render('dashboard', {
      title: 'Dashboard',
      activePage: 'dashboard',
      counts,
      total: totalRow[0].total,
      totalPoints: totalRow[0].total_points,
      recent,
      STATUS_FLOW,
    });
  } catch (err) {
    next(err);
  }
});

// GET /admin/redemptions
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

    const { rows: redemptions } = await pool.query(query, params);

    res.render('redemptions', {
      title: 'All Redemptions',
      activePage: 'redemptions',
      redemptions,
      filters: { status: status || 'all', category: category || 'all', search: search || '' },
      STATUS_FLOW,
    });
  } catch (err) {
    next(err);
  }
});

// GET /admin/redemptions/:id
router.get('/redemptions/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      `SELECT r.*, g.name as gift_name, g.image as gift_image, g.description as gift_description,
              g.category as gift_category, g.points as gift_points, g.rating as gift_rating, g.color as gift_color,
              u.name as user_name, u.email as user_email
       FROM redemptions r
       JOIN gifts g ON r.gift_id = g.id
       JOIN users u ON r.user_id = u.id
       WHERE r.id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).send('Redemption not found');
    }

    const { rows: statusLog } = await pool.query(
      `SELECT * FROM redemption_status_log WHERE redemption_id = $1 ORDER BY created_at ASC`,
      [id]
    );

    const nextStatus = getNextStatus(rows[0].status);

    res.render('redemption-detail', {
      title: `Order ${rows[0].order_id}`,
      activePage: 'redemptions',
      redemption: rows[0],
      statusLog,
      nextStatus,
      STATUS_FLOW,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
