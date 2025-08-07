const knex = require('../db/knex');
const bcrypt = require('bcrypt');

async function createUser() {
  const username = 'testuser';
  const password = 'testpassword';
  const hashed = await bcrypt.hash(password, 10);

  try {
    await knex('users').insert({ name: username, password: hashed });
    console.log('✅ ユーザー登録完了');
  } catch (err) {
    console.error('❌ ユーザー登録失敗:', err.message);
  } finally {
    process.exit();
  }
}

createUser();
