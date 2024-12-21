const { Server } = require('socket.io');
const { allowedOrigins } = require('../../config/config');

module.exports = function configureSocketServer(httpServer, origins = allowedOrigins, methods = ['GET', 'POST']) {
    const io = new Server(httpServer, {
        cors: {
            origin: origins,
            methods: methods
        },
    });

    return io;
};
