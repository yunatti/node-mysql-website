// Knexを使う場合はこちら
const db = require('../db/knex'); 
const express = require('express');
const router = express.Router();
const db = require('../db');  // DB接続

// カレンダー表示
router.get('/', async (req, res) => {
    const [events] = await db.query('SELECT * FROM events');
    res.render('calendar', { events });
});

// イベント追加
router.post('/add', async (req, res) => {
    const { title, date } = req.body;
    await db.query('INSERT INTO events (title, event_date) VALUES (?, ?)', [title, date]);
    res.redirect('/calendar');
});

module.exports = router;
