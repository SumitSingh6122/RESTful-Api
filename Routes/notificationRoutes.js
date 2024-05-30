
const express = require('express');
const notificationController = require('../controller/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Make sure all methods are defined in notificationController
router.get('/', authMiddleware, notificationController.getNotifications);
router.post('/', authMiddleware, notificationController.createNotification);  // Add this if creating notifications
router.patch('/:id', authMiddleware, notificationController.markAsRead);

module.exports = router;

