import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// GET /api/gifts — List all gifts, optional ?category=tools
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM gifts ORDER BY id';
    const params = [];

    if (category && category !== 'all') {
      query = 'SELECT * FROM gifts WHERE category = $1 ORDER BY id';
      params.push(category);
    }

    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;
