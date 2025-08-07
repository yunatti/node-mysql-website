const environment = "development";
const config = require("../knexfile.js")[environment];
const knex = require("knex")(config);

// カレンダー表示
router.get('/', async (req, res) => {
    const events = await db('events').select('*');  // knex風
    res.render('calendar', { events });
});

// イベント追加
router.post('/add', async (req, res) => {
    const { title, date } = req.body;
    await db('events').insert({ title: title, event_date: date });
    res.redirect('/calendar');
});


module.exports = knex;