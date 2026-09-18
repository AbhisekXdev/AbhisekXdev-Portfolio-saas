import express from 'express';
import { query } from '../db.js';
import { parseJson, toExperience, toProject } from '../utils.js';

const router = express.Router();

router.get('/dashboard', async (_req, res, next) => {
  try {
    const [projects, skills, experience, inquiries] = await Promise.all([
      query('SELECT COUNT(*) AS count FROM projects'),
      query('SELECT COUNT(*) AS count FROM skills'),
      query('SELECT COUNT(*) AS count FROM experience'),
      query("SELECT COUNT(*) AS count FROM inquiries WHERE status = 'new'")
    ]);

    res.json({
      projects: projects[0].count,
      skills: skills[0].count,
      experience: experience[0].count,
      newInquiries: inquiries[0].count
    });
  } catch (error) {
    next(error);
  }
});

router.put('/profile', async (req, res, next) => {
  try {
    const {
      name, headline, summary = '', email = '',
      linkedin_url = '', github_url = '', portfolio_url = ''
    } = req.body;

    const existing = await query('SELECT id FROM portfolio_profile ORDER BY id LIMIT 1');
    if (existing.length) {
      await query(
        `UPDATE portfolio_profile
         SET name=?, headline=?, summary=?, email=?, linkedin_url=?, github_url=?, portfolio_url=?
         WHERE id=?`,
        [name, headline, summary, email, linkedin_url, github_url, portfolio_url, existing[0].id]
      );
    } else {
      await query(
        `INSERT INTO portfolio_profile
         (name, headline, summary, email, linkedin_url, github_url, portfolio_url)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, headline, summary, email, linkedin_url, github_url, portfolio_url]
      );
    }

    res.json({ message: 'Profile updated.' });
  } catch (error) {
    next(error);
  }
});

router.post('/projects', async (req, res, next) => {
  try {
    const {
      title, slug, description, tech_stack = [], bullets = [],
      repository_url = '', live_url = '', featured = true, sort_order = 0
    } = req.body;

    const result = await query(
      `INSERT INTO projects
       (title, slug, description, tech_stack, bullets, repository_url, live_url, featured, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, description, JSON.stringify(tech_stack), JSON.stringify(bullets),
       repository_url, live_url, Boolean(featured), Number(sort_order)]
    );

    const rows = await query('SELECT * FROM projects WHERE id=?', [result.insertId]);
    res.status(201).json(toProject(rows[0]));
  } catch (error) {
    next(error);
  }
});

router.put('/projects/:id', async (req, res, next) => {
  try {
    const {
      title, slug, description, tech_stack = [], bullets = [],
      repository_url = '', live_url = '', featured = true, sort_order = 0
    } = req.body;

    const result = await query(
      `UPDATE projects
       SET title=?, slug=?, description=?, tech_stack=?, bullets=?, repository_url=?, live_url=?, featured=?, sort_order=?
       WHERE id=?`,
      [title, slug, description, JSON.stringify(tech_stack), JSON.stringify(bullets),
       repository_url, live_url, Boolean(featured), Number(sort_order), req.params.id]
    );

    if (!result.affectedRows) return res.status(404).json({ message: 'Project not found.' });

    const rows = await query('SELECT * FROM projects WHERE id=?', [req.params.id]);
    res.json(toProject(rows[0]));
  } catch (error) {
    next(error);
  }
});

router.delete('/projects/:id', async (req, res, next) => {
  try {
    const result = await query('DELETE FROM projects WHERE id=?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Project not found.' });
    res.json({ message: 'Project deleted.' });
  } catch (error) {
    next(error);
  }
});

router.post('/skills', async (req, res, next) => {
  try {
    const { category, name, sort_order = 0 } = req.body;
    const result = await query(
      'INSERT INTO skills (category, name, sort_order) VALUES (?, ?, ?)',
      [category, name, Number(sort_order)]
    );
    const rows = await query('SELECT * FROM skills WHERE id=?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/skills/:id', async (req, res, next) => {
  try {
    await query('DELETE FROM skills WHERE id=?', [req.params.id]);
    res.json({ message: 'Skill deleted.' });
  } catch (error) {
    next(error);
  }
});

router.post('/experience', async (req, res, next) => {
  try {
    const {
      role, company = '', description = '', bullets = [],
      start_date = '', end_date = '', sort_order = 0
    } = req.body;

    const result = await query(
      `INSERT INTO experience
       (role, company, description, bullets, start_date, end_date, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [role, company, description, JSON.stringify(bullets), start_date, end_date, Number(sort_order)]
    );
    const rows = await query('SELECT * FROM experience WHERE id=?', [result.insertId]);
    res.status(201).json(toExperience(rows[0]));
  } catch (error) {
    next(error);
  }
});

router.delete('/experience/:id', async (req, res, next) => {
  try {
    await query('DELETE FROM experience WHERE id=?', [req.params.id]);
    res.json({ message: 'Experience deleted.' });
  } catch (error) {
    next(error);
  }
});

router.get('/inquiries', async (_req, res, next) => {
  try {
    const rows = await query('SELECT * FROM inquiries ORDER BY created_at DESC');
    res.json(rows.map(row => ({ ...row, features: parseJson(row.features, []) })));
  } catch (error) {
    next(error);
  }
});

router.patch('/inquiries/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'reviewing', 'contacted', 'closed'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid inquiry status.' });
    }

    await query('UPDATE inquiries SET status=? WHERE id=?', [status, req.params.id]);
    const rows = await query('SELECT * FROM inquiries WHERE id=?', [req.params.id]);
    res.json({ ...rows[0], features: parseJson(rows[0]?.features, []) });
  } catch (error) {
    next(error);
  }
});

export default router;
