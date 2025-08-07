const express = require('express');
const router = express.Router();
const db = require('../db');


// 認証チェック用ミドルウェア
/*function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin'); // ログインしてない場合はサインインページへ
}*/

// カレンダーページ表示
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
