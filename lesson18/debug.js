let debug;
if(process.env.DEBUG) {
    debug = data => {
        console.error(data);
    };
} else {
    debug = () => {};
}

debug('this is a debug call');
console.log('Hello World');
debug('this is another debug call');