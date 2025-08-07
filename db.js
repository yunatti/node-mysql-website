// db.js
const mysql = require('mysql2/promise');

// DB接続設定（適宜修正）
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database',
});

module.exports = pool;
