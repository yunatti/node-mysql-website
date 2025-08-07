const express = require('express');
const router = express.Router();
const db = require('../db');

// 認証なしでカレンダー表示
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM events ORDER BY date');
  res.render('calendar', { events: rows });
});

// イベント追加
router.post('/add', async (req, res) => {
  const { title, date } = req.body;
  await db.query('INSERT INTO events (title, date) VALUES (?, ?)', [title, date]);
  res.redirect('/calendar');
});

module.exports = router;
