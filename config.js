
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function testDatabaseConnection() {
    try {
    
      const connection = await pool.getConnection();
      
      console.log('Database connected successfully.');
      
      connection.release();
    } catch (error) {
    
      console.error('Error connecting to database:', error.message);
    }
  }
  
  testDatabaseConnection();
module.exports = pool;
