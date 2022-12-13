const mysql = require("mysql2");

const db = mysql.createPool({
  host: 'localhost',
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

module.exports = db;
