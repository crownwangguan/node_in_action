const net = require('net');

// net.createServer(socket => {
//     socket.write('Hello World\r\n');
//     socket.end();
// }).listen(1337);
// console.log('listening on port 1337');

let socket = net.connect({host: process.argv[2], port: 22});
socket.setEncoding('utf8');

socket.once('data', chunk => {
    console.log('SSH server version: %j', chunk.trim());
    socket.end();
});