const express = require('express');
const router = express.Router();
const db = require('../db');
const calendarRouter = require('./routes/calendar');
app.use('/calendar', calendarRouter);

// 認証なしでカレンダー表示
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM tasks ORDER BY event_date');
  console.log(rows);
  res.render('calendar', { tasks: rows });
});

router.post('/add', async (req, res) => {
  const { title, date } = req.body;
  await db.query('INSERT INTO events (title, event_date) VALUES (?, ?)', [title, date]);
  res.redirect('/calendar');
});


module.exports = router;
