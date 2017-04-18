const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

let workers = {};
let requests = 0;

if(cluster.isMaster) {
    for(let i = 0; i < numCPUs; i++) {
        workers[i] = cluster.fork();
        workers[i].on('message', message => {
            if(message.cmd == 'incrementRequestTotal') {
                requests++;
                for(let j = 0; j < numCPUs; j++) {
                    workers[j].send({
                        cmd: 'updateOfRequestTotal',
                        requests: requests
                    });
                }
            }
        });
        cluster.on('exit', (worker, code, signal) => {
            console.log('Worker ' + worker.process.pid + ' died.');
        });
    }
} else {
    process.on('message', (message) => {
        if(message.cmd == 'updateOfRequestTotal') {
            requests = message.requests;
        }
    });

    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Worker in process ' + process.pid + ' says cluster has responded to ' + requests + ' requests.');
        process.send({cmd: 'incrementRequestTotal'});
    }).listen(8000);
}