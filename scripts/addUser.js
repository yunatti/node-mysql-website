const knex = require('./db/knex');
const bcrypt = require('bcrypt');

async function createUser() {
  const username = 'testuser';
  const password = 'testpassword';
  const hashed = await bcrypt.hash(password, 10);

  await knex('users').insert({ name: username, password: hashed });
  console.log('ユーザー登録完了');
  process.exit();
}

createUser();