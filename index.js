const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRoutes');
const itemRoutes = require('./Routes/itemRoutes');
const bidRoutes = require('./Routes/birdRoutes');
const notificationRoutes = require('./Routes/notificationRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/items', authMiddleware, itemRoutes);
app.use('/bids', authMiddleware, bidRoutes);
app.use('/notifications', authMiddleware, notificationRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
