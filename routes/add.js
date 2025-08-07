// ルートにある routes/index.js に追加でもOK
router.post('/add', function (req, res, next) {
  const todo = req.body.add;
  const due_date = req.body.due_date || null;
  knex("tasks")
    .insert({ user_id: 1, content: todo, due_date: due_date })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.error(err);
      res.status(500).send('追加エラー');
    });
});
