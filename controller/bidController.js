const pool = require('../config');

exports.getBids = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bids WHERE item_id = ?', [req.params.itemId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBid = async (req, res) => {
  const { bid_amount } = req.body;

  try {
    const [itemRows] = await pool.query('SELECT * FROM items WHERE id = ?', [req.params.itemId]);
    const item = itemRows[0];

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (bid_amount <= item.current_price) {
      return res.status(400).json({ error: 'Bid amount must be higher than current price' });
    }

    const [result] = await pool.query(
      'INSERT INTO bids (item_id, user_id, bid_amount) VALUES (?, ?, ?)',
      [req.params.itemId, req.user.id, bid_amount]
    );

    await pool.query('UPDATE items SET current_price = ? WHERE id = ?', [bid_amount, req.params.itemId]);

    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
