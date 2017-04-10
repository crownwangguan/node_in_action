const mongodb = require('mongodb');
const server = new mongodb.Server('127.0.0.1', 27017, {});
const ObjectID = require('mongodb').ObjectID;
const client = new mongodb.Db('mydb', server, {w:1});

client.open(function(err) {
    if (err) throw err;
    client.collection('test_insert', function(err, collection) {
        if (err) throw err;
        console.log('We are now able to perform queries.');
        collection.insert(
            {
                "title": "I like cake",
                "body": "It is quite good."
            },
            {safe: true}
        );
        collection.update(
            {_id: ObjectID('58ebadbd4f16490429cfcada')},
            {$set: {"title": "I ate too much cake"}},
            {safe: true},
            function(err) {
                if (err) throw err;
            });

        collection.find({"title": "I like cake"}).toArray(
            function(err, results) {
                if (err) throw err;
                console.log(results);
            }
        );

        var _id = new ObjectID('58ebaea8d86348062f789b32');
        collection.remove({_id: _id}, {safe: true}, function(err) {
            if (err) throw err;
        });
    });
});

