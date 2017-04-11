const connect = require('connect');
const favicons = require('connect-favicons');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const redisStroe = require('redis-sessions');

const app = connect()
    .use(favicons(__dirname + '/public/img/icons'))
    .use(session({
        name: 'session',
        keys: ['key1', 'key2'],
        maxAge: 24*60*60*1000
    }))
    .use('/get', (req, res, next) => {
        req.session.views = (req.session.views || 0) + 1;
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>views: ' + req.session.views + '</h1>');
        res.write('<p>expires in: ' + (req.session.maxAge / 1000) + 's</p>');
        res.write('<p>path: ' + req.session.path + '</p>');
        res.write('<p>domain: ' + req.session.domain + '</p>');
        res.write('<p>secure: ' + req.session.secure + '</p>');
        res.end();
    })
    .use('/gege', (req, res, next) => {
        let rs = new redisStroe();
        rs.create({
            app: "myapp",
            id: "user1001",
            ip: "192.168.22.58",
            ttl: 3600,
            d: { 
                foo: "bar",
                unread_msgs: 34
            }
        }, (err, res) => {
            console.log(res)
        })
        next();
    })
    
    .listen(3000);