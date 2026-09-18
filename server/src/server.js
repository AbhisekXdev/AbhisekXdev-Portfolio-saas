import app from './app.js';
import { config } from './config.js';
import { pool } from './db.js';

const server = app.listen(config.port, () => {
  console.log(`API running on http://localhost:${config.port}`);
});

async function shutdown() {
  console.log('Shutting down...');
  await pool.end();
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
