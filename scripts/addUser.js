const knex = require('../db/knex');
const bcrypt = require('bcrypt');

const username = 'testuser';
const password = 'testpass';

async function createUser() {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await knex('users').insert({
      name: username,
      password: hashedPassword,
    });
    console.log(`✅ ユーザー "${username}" を作成しました`);
    process.exit(0);
  } catch (err) {
    console.error('❌ エラー:', err);
    process.exit(1);
  }
}

createUser();
