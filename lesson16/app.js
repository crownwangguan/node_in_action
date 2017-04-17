const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
    console.log('connected');
});

client.set('framework', 'AngularJS', (err, reply) => {
    console.log(reply);
});

client.get('framework', (err, reply) => {
    console.log(reply);
});

client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express', (err, reply) => {
    console.log(reply);
});

client.hgetall('frameworks', (err, object) => {
    console.log(object);
});

client.rpush(['frameworkss', 'angularjs', 'backbone'], (err, reply) => {
    console.log(reply);
});

client.lrange('frameworkss', 0, -1, (err, reply) => {
    console.log(reply);
});

client.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], (err, reply) => {
    console.log(reply);
});

client.smembers('tags', (err, reply) => {
    console.log(reply);
});

client.exists('key', (err, reply) => {
    if(reply == 1) {
        console.log('exists');
    } else {
        console.log('does\'t exist');
    }
});

client.del('frameworks', (err, reply) => {
    console.log(reply);
});

client.set('key1', 'val1');
client.expire('key1', 30);

client.set('key1', 10, function() {
    client.incr('key1', function(err, reply) {
        console.log(reply); // 11
    });
});