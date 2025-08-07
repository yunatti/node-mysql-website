const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM tasks ORDER BY due_date');
  res.render('calendar', { tasks: rows });
});

router.post('/add', async (req, res) => {
  const { content, due_date } = req.body;
  await db.query('INSERT INTO tasks (content, due_date) VALUES (?, ?)', [content, due_date]);
  res.redirect('/calendar');
});

module.exports = router;
