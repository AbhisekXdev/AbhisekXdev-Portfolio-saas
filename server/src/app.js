import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';
import { verifyFirebaseToken } from './firebase.js';
import { requireAdmin } from './middleware/admin.js';

const app = express();

app.use(cors({
  origin: config.clientUrl.split(',').map(value => value.trim()),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '1mb' }));

app.use('/api', publicRoutes);
app.use('/api/admin', verifyFirebaseToken, requireAdmin, adminRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ message: 'A record with the same unique value already exists.' });
  }
  res.status(500).json({ message: 'Internal server error.' });
});

export default app;
