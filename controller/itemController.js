const pool = require('../config');
const { validationResult } = require('express-validator');

exports.getItems = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await pool.query('SELECT * FROM items LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, starting_price, end_time } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const [result] = await pool.query(
      'INSERT INTO items (name, description, starting_price, current_price, image_url, end_time) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, starting_price, starting_price, imageUrl, end_time]
    );
    res.status(201).json({ id: result.insertId, name, description, starting_price, current_price: starting_price, imageUrl, end_time });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const { name, description, starting_price, end_time } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const [result] = await pool.query(
      'UPDATE items SET name = ?, description = ?, starting_price = ?, end_time = ?, image_url = ? WHERE id = ?',
      [name, description, starting_price, end_time, imageUrl, req.params.id]
    );
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await pool.query('DELETE FROM items WHERE id = ?', [req.params.id]);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
