const connect = require('connect');
const app = connect();

function logger(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
    next();
}

function restrict(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        return next(new Error('Unauthorized'));
    }
        
    let parts = authorization.split(' ');
    let scheme = parts[0];
    let auth = new Buffer(parts[1], 'base64').toString().split(':');
    let user = auth[0];
    let pass = auth[1];

    authenticateWithDatabase(user, pass, err => {
        if(err) return next(err);
        next();
    });
}

function admin(req, res, next) {
    switch (req.url) {
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;
    }
}

app.use(logger);
app.use(hello);
app.use('/admin', admin);
app.use('/restrict', restrict);

app.listen(3000);