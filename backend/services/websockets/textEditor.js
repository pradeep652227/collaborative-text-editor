/* Internal Modules */
const configureSocketServer = require('./configureSocketServer');

module.exports = function textEditorWebSocket(httpServer) {
  const io = configureSocketServer(httpServer);
  /* Socket.IO Implementation */
  io.on('connection', (socket) => {
    console.log('Client Connected for Websockets - Text Editor Logic');

    // Handle incoming messages
    socket.on('message', (message) => {
      console.log(`Received: ${message}`);
      const response = { text: message }; // Prepare response

      // Broadcast the message to all other connected clients
      socket.broadcast.emit('message', response);
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.log(`Client Disconnected. Reason: ${reason}`);
    });
  });
};