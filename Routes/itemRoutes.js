const express = require('express');
const bidController = require('../controller/bidController');

const router = express.Router();

router.get('/:itemId', bidController.getBids);
router.post('/:itemId', bidController.createBid);

module.exports = router;
