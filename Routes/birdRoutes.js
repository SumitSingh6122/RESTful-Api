const express = require('express');
const bidController = require('../controller/bidController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:itemId', authMiddleware, bidController.getBids);
router.post('/:itemId', authMiddleware, bidController.createBid);

module.exports = router;
