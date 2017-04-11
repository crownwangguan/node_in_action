const connect = require('connect');
const query = require('connect-query');

const app = connect()
    .use(query())
    .use((req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(req.query));
    })
    .listen(3000);