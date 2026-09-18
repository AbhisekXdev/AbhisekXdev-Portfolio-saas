import { query } from '../db.js';

export async function requireAdmin(req, res, next) {
  try {
    const rows = await query(
      'SELECT id, firebase_uid, email, display_name FROM admins WHERE firebase_uid = ? LIMIT 1',
      [req.user.uid]
    );

    if (!rows.length) {
      return res.status(403).json({ message: 'Admin access denied.' });
    }

    req.admin = rows[0];
    next();
  } catch (error) {
    next(error);
  }
}
