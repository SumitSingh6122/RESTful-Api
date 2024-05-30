const pool = require('../config');

exports.getNotifications = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM notifications WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNotification = async (req, res) => {
  const { message } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO notifications (user_id, message) VALUES (?, ?)',
      [req.user.id, message]
    );
    res.status(201).json({ id: result.insertId, message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await pool.query('UPDATE notifications SET is_read = true WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
