const express = require('express');
const router = express.Router();
const db = require('../db'); // 既存のDB接続モジュール

// 認証チェック用ミドルウェア
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin'); // ログインしてない場合はサインインページへ
}

// カレンダーページ表示
router.get('/', ensureAuthenticated, async (req, res) => {
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
