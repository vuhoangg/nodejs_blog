const mysql = require('mysql2');
// const mysql = require('mysql2/promise');
require('dotenv').config()


// Create the connection to database
const connection = mysql.createConnection({

  // host: '35.185.178.198',
  // user: 'root',
  // database: 'bac_db',
  // password: 'xn8jLMFZF8ZGeJWM',
  // port: 3306


  // host: 'localhost',
  // user: 'root',
  // database: 'manager_spending',
  // password: '',
  // port: 3306

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT


});

module.exports = connection;