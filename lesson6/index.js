function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

const events = require('events');
const util = require('util');

util.inherits(Watcher, events.EventEmitter);
// Watcher.prototype = new events.EventEmitter();

const fs = require('fs');
let watchDir = './watch';
let processedDir = './done';

Watcher.prototype.watch = function() {
    let watch = this;
    fs.readdir(this.watchDir, (err, files) => {
        if(err) throw err;
        for(let index in files) {
            watcher.emit('process', files[index]);
        }
    })
}

Watcher.prototype.start = function() {
    let watcher = this;
    fs.watchFile(watchDir, () => {
        watcher.watch();
    })
}

const watcher = new Watcher(watchDir, processedDir);
watcher.on('process', file => {
    let watchFile = watchDir + '/' + file;
    let processedFile = processedDir + '/' + file.toLowerCase();
    fs.rename(watchFile, processedFile, err => {
        if(err) throw err;
    });
});

watcher.start();