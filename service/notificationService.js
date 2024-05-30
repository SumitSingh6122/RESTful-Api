const pool = require('../config');

exports.createNotification = async (userId, message) => {
  const result = await pool.query(
    'INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *',
    [userId, message]
  );
  return result.rows[0];
};
