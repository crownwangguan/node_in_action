var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};
channel.on('join', (id, socket) => {
    channel.clients[id] = socket;
});

channel.on('broadcast', (socket, id, dataString) => {
    Object.keys(channel.clients).forEach(key => {
        if(id != key) {
            channel.clients[key].write(dataString);
        }
    });
});

channel.on('leave', (socket, id) => {
    delete channel.clients[id];
    console.log(id + ' has left the room');
});

var server = net.createServer(socket => {
    var id = socket.remoteAddress + ':' + socket.remotePort;
    channel.emit('join', id, socket);
    socket.on('data', data => {
        dataString = data.toString();
        channel.emit('broadcast', socket, id, dataString);
    });
    socket.on('close', () => {
        channel.emit('leave', socket, id);
    });
});
server.listen(8888);