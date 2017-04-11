const connect = require('connect');
const bodyParser = require('body-parser');

const app = connect()
    .use(bodyParser.urlencoded({extended: true}))
    .use((req, res) => {
        console.log(req);
    })
    .listen(3000);