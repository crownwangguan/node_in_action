// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.write('Hello World');
//     res.end();
// });
// server.listen(3000);

// const http = require('http');
// const server = http.createServer((req, res) => {
//     const body = 'Hello World';
//     res.setHeader('Content-Length', body.length);
//     res.setHeader('Content-Type', 'text/plain');
//     res.end(body);
// });
// server.listen(3000);

const http = require('http');
const server = http.createServer((req, res) => {
    const url = 'http://google.com';
    const body = '<p>Redirecting to <a href="' + url + '">' + url + '</a></p>';
    res.setHeader('Location', url);
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 302;
    res.end(body);
});
server.listen(3000);