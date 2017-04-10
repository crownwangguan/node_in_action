const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');

client.on('error', err => {
    console.error('Error ' + err);
});

client.set('color', 'red', redis.print);
client.get('color', (err, value) => {
    if(err) throw err;
    console.log('Got: ' + value);
});

client.hmset('camping', {
    'shelter': '2-person tent',
    'cooking': 'campstove'
}, redis.print);

client.hget('camping', 'cooking', (err, value) => {
    if (err) throw err;
    console.log('Will be cooking with: ' + value);
});

client.hkeys('camping', (err, keys) => {
    if (err) throw err;
    keys.forEach((key, i) => {
        console.log(' ' + key);
    });
});

client.lpush('tasks', 'Paint the bikeshed red.', redis.print);
client.lpush('tasks', 'Paint the bikeshed green.', redis.print);
client.lrange('tasks', 0, -1, (err, items) => {
    if (err) throw err;
    items.forEach((item, i) => {
        console.log(' ' + item);
    });
});

client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '72.32.231.8', redis.print);
client.smembers('ip_addresses', (err, members) => {
    if (err) throw err;
    console.log(members);
});

