const pool = require('../config');

exports.createUser = async (username, password, email) => {
  const result = await pool.query(
    'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
    [username, password, email]
  );
  return result.rows[0];
};

exports.findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

exports.findUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};
