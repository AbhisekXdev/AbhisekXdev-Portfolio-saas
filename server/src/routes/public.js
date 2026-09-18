import express from 'express';
import { query } from '../db.js';
import { toExperience, toProject, parseJson } from '../utils.js';

const router = express.Router();

router.get('/health', async (_req, res) => {
  try {
    await query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', database: 'unavailable' });
  }
});

router.get('/portfolio', async (_req, res, next) => {
  try {
    const [profiles, skills, experience] = await Promise.all([
      query('SELECT * FROM portfolio_profile ORDER BY id LIMIT 1'),
      query('SELECT * FROM skills ORDER BY category, sort_order, id'),
      query('SELECT * FROM experience ORDER BY sort_order, id')
    ]);

    res.json({
      profile: profiles[0] || null,
      skills,
      experience: experience.map(toExperience)
    });
  } catch (error) {
    next(error);
  }
});

router.get('/projects', async (req, res, next) => {
  try {
    const featured = req.query.featured;
    const rows = featured === 'true'
      ? await query('SELECT * FROM projects WHERE featured = TRUE ORDER BY sort_order, id')
      : await query('SELECT * FROM projects ORDER BY sort_order, id');

    res.json(rows.map(toProject));
  } catch (error) {
    next(error);
  }
});

router.get('/projects/:id', async (req, res, next) => {
  try {
    const rows = await query('SELECT * FROM projects WHERE id = ? LIMIT 1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Project not found.' });
    res.json(toProject(rows[0]));
  } catch (error) {
    next(error);
  }
});

router.get('/skills', async (_req, res, next) => {
  try {
    res.json(await query('SELECT * FROM skills ORDER BY category, sort_order, id'));
  } catch (error) {
    next(error);
  }
});

router.get('/experience', async (_req, res, next) => {
  try {
    const rows = await query('SELECT * FROM experience ORDER BY sort_order, id');
    res.json(rows.map(toExperience));
  } catch (error) {
    next(error);
  }
});

router.post('/inquiries', async (req, res, next) => {
  try {
    const {
      name, email, company = '', project_title, project_type = '',
      budget = '', timeline = '', description, features = []
    } = req.body;

    if (!name || !email || !project_title || !description) {
      return res.status(400).json({
        message: 'Name, email, project title, and description are required.'
      });
    }

    const result = await query(
      `INSERT INTO inquiries
       (name, email, company, project_title, project_type, budget, timeline, description, features)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        email.trim(),
        company.trim(),
        project_title.trim(),
        project_type.trim(),
        budget.trim(),
        timeline.trim(),
        description.trim(),
        JSON.stringify(features)
      ]
    );

    res.status(201).json({ id: result.insertId, message: 'Project request received.' });
  } catch (error) {
    next(error);
  }
});

export default router;
