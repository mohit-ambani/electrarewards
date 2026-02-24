import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import giftsRouter from './routes/gifts.js';
import redemptionsRouter from './routes/redemptions.js';
import adminApiRouter from './routes/admin.js';
import adminPagesRouter from './routes/adminPages.js';
import errorHandler from './middleware/errorHandler.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

// View engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(join(__dirname, 'public')));

// API routes (JSON)
app.use('/api/gifts', giftsRouter);
app.use('/api/redemptions', redemptionsRouter);
app.use('/api/admin', adminApiRouter);

// Admin page routes (EJS)
app.use('/admin', adminPagesRouter);

// Root redirect
app.get('/', (req, res) => {
  res.redirect('/admin/dashboard');
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`ElectraRewards Admin Backend running on http://localhost:${PORT}`);
  console.log(`Admin Dashboard: http://localhost:${PORT}/admin/dashboard`);
});
