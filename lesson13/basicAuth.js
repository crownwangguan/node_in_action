const connect = require('connect');
const auth = require('basic-auth');

const app = connect()
    .use('/', (req, res) => {
        let credentials = auth(req)
 
        if (!credentials || credentials.name !== 'john' || credentials.pass !== 'secret') {
            res.statusCode = 401
            res.setHeader('WWW-Authenticate', 'Basic realm="example"')
            res.end('Access denied')
        } else {
            res.end('Access granted')
        }
    })
    .listen(3000);