const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(require('cookie-parser')('YOUR SECRET GOES HERE'));
app.use(session({
        name: 'session',
        keys: ['key1', 'key2'],
        maxAge: 24*60*60*1000
    }));

app.use(require('csurf')());

app.get('/some-form', function(req, res){
    res.send('<form action="/process" method="POST">' +
        '<input type="hidden" name="_csrf" value="' + req.csrfToken() + '">' +
        'Favorite color: <input type="text" name="favoriteColor">' +
        '<button type="submit">Submit</button>' +
        '</form>');
});

app.post('/process', function(req, res){
    console.log(req.body);
    res.send('<p>Your favorite color is "' + req.body.favoriteColor + '".');
});

app.listen(3000);