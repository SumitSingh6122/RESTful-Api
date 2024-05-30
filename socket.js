
  module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('New client connected');
      
      socket.on('bid', (data) => {
        // handle new bid and notify all clients
        io.emit('update', data);
      });
  
      socket.on('notify', (data) => {
        // send notifications to users
        io.emit('notification', data);
      });
  
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  };
  