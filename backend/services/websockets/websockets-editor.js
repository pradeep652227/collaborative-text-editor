/* External Modules */
const websocket = require('ws');
const http = require('http');
const path = require('path');

/* Initialization */
const httpServer = http.createServer();

const wss = new websocket.Server({ noServer: true });

/*
wss: Represents the WebSocket server created using the ws module.
connection: This event is triggered whenever a client successfully connects to the WebSocket server.
ws: Represents the WebSocket connection with a specific client. Each client gets its own ws object.
The callback function runs for every new client connection, logging that the client has connected.

*/

wss.on('connection', (ws) => {
    console.log('Client Connected for Websockets - Text Editor Logic');
    // Broadcast this message to all the other active client

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        const response = JSON.stringify({ text: message }); // Send JSON data
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === websocket.OPEN) {
                client.send(response);
            }
        });
    });

    ws.on('close', (code, reason) => {
        console.log(`Connection closed. Code: ${code}, Reason: ${reason}`);
    });
});

// Upgrade the specified routes to WebSocket
httpServer.on('upgrade', (req, socket, head) => {
    const pathName = req.url;
    const origin = req.headers.origin;

    console.log(`Upgrade requested for path: ${pathName}`);
    console.log(`Upgrade request from ${req.socket.remoteAddress}`);

    if (pathName === '/api/editor') {
        console.log(`Upgrading WebSocket connection for ${pathName}`);
        wss.handleUpgrade(req, socket, head, (ws) => {
            console.log('WebSocket connection upgraded');
            wss.emit('connection', ws, req);
        });
    } else {
        console.log(`Invalid WebSocket path: ${pathName}`);
        socket.destroy();
    }

});

module.exports = {
    httpServer,
    websocket_Editor_wss: wss
};
