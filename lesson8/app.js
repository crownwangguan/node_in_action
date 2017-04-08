const http = require('http');
const url = require('url');

let items = [];
const server = http.createServer((req, res) => {
    switch(req.method) {
        case 'POST':
            let item = '';
            req.setEncoding('utf8');
            req.on('data', chunk => {
                item += chunk;
            });
            req.on('end', () => {
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            let body = items.map((item, i) => {
                return i + ') ' + item;
            }).join('\n');
            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
            res.end(body);
            break;
        case 'PUT':
            let _path = url.parse(req.url).pathname;
            console.log(url.parse(req.url));
            let _i = parseInt(_path.slice(1), 10);
            let _item = '';
            req.setEncoding('utf8');
            req.on('data', chunk => {
                _item += chunk;
            });
            req.on('end', () => {
                items[_i] = _item;
                res.end('OK\n');
            });
            break;
        case 'DELETE':
            let path = url.parse(req.url).pathname;
            let i = parseInt(path.slice(1), 10);
            if(isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if(!items[i]) {
                res.statusCode = 404;
                res.end('Item not found');
            } else {
                items.splice(i, 1);
                res.end('OK\n');
            }
            break;
    }
});

server.listen(3000);