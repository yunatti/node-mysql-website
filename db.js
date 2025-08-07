// db.js
const mysql = require('mysql2/promise');

// 必要に応じて値を編集
const pool = mysql.createPool({
  host: 'localhost',       // 例: '127.0.0.1'
  user: 'your_user',       // 例: 'root'
  password: 'your_pass',   // 例: 'password'
  database: 'your_dbname', // 例: 'calendar_app'
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
