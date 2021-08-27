// Node.js WebSocket server script
const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(9898);
const wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
//console.log('Received Message:', message.utf8Data);
    PythonShell.runString(message.utf8Data, null, function (err, results) {
//console.log(err);
//console.log(results);
    if (err) connection.sendUTF(err.traceback);
    if (results) connection.sendUTF(results);

});
//connection.sendUTF('Got: '+ message.utf8Data);
    });
    connection.on('close', function(reasonCode, description) {
console.log('Client has disconnected.');
});
});