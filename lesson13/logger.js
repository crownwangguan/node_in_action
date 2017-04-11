'use strict';
const winston = require('winston');

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

const connect = require('connect');
const app = connect()
  .use(require("morgan")("combined", { "stream": logger.stream }))
  .use('/hello', (req, res) => {
    res.end('Hello, world\n');
  });

app.listen(3000);