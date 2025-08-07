/*const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.redirect('/calendar');
  }
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  knex("tasks")
    .select("*")
    .then(function (results) {
      res.render('index', {
        title: 'ToDo App',
        todos: results,
        isAuth: isAuth,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
      });
    });
});

router.post('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const todo = req.body.add;
  const due_date = req.body.due_date || null; // ← 追加: フォームからの期限

  knex("tasks")
    .insert({
      user_id: userId || 1, // セッションがあればそれ、なければ仮で1
      content: todo,
      due_date: due_date
    })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
      });
    });
});


router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;
*/
// routes/index.js
var express = require('express');
var router = express.Router();
var knex = require('../db/knex'); // ← knexの読み込みを忘れずに

/* カレンダー表示をルートにする */
router.get('/', function(req, res, next) {
  // 認証をスキップして仮のユーザーIDでデータを取得
  const userId = 1; // 仮のユーザーID（テスト用）

  knex('tasks')
    .where({ user_id: userId })
    .orderBy('due_date', 'asc')
    .then(rows => {
      res.render('index', {
        title: 'ToDo App',
        isAuth: true, // 仮にログイン済みとして扱う
        tasks: rows
      });
    })
    .catch(err => {
      console.error(err);
      res.render('index', { title: 'ToDo App', isAuth: false, tasks: [] });
    });
});


module.exports = router;
