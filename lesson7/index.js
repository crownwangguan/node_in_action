// setTimeout(() => {
//     console.log('I execute first');
//     setTimeout(() => {
//         console.log('I execute second');
//         setTimeout(() => {
//             console.log('I execute third');
//         }, 100);
//     }, 500);
// }, 1000);

const flow = require('nimble');

flow.series([
    callback => {
        setTimeout(() => {
            console.log('I execute first');
        }, 1000);
        callback();
    },
    callback => {
        setTimeout(() => {
            console.log('I execute second');
        }, 500);
        callback();
    },
    callback => {
        setTimeout(() => {
            console.log('I execute third');
        }, 100);
        callback();
    }
]);