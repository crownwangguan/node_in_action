const mysql = require('mysql');
const bcrypt = require('bcrypt');

const db = mysql .createConnection({
    host: '127.0.0.1',
    user: 'guan',
    password: '123456',
    database: 'guandb'
});

db.connect();

const saltRounds = 12;
const _hashPassword = function(password) {
    return bcrypt.hash(password, saltRounds);
};

const saveUser = function(name, password, age) {
    let new_user = {
        name: name,
        age: age,
        password: password
    };
    _hashPassword(password)
        .then(pwd => {
            new_user.password = pwd;
            let queryString = `INSERT INTO user (name, password, age) VALUES ('${new_user.name}', '${new_user.password}', '${new_user.age}');`;
            db.query(queryString, err => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('Store successfully')
                }
            });
            db.end();
        })
        .catch(err => {
            console.error(err);
        });
};

const getByName = function(name, callback) {
    let queryString = `SELECT * FROM user WHERE name='${name}';`
    db.query(queryString, (err, result) => {
        if(err) {
            return callback(err);
        } else {
            callback(result);
        }
    });
};

const authenticate = function(name, pass) {
    getByName(name, user => {
        if(!user) return console.log('no user found');
        bcrypt.hash(pass, saltRounds, hash => {
            if(hash == user.password) {
                console.log(user);
            }
        });
    });
};

saveUser('guaan', '12345', 25);

getByName('guaan', (result) => {
    console.log(result)
});

authenticate('guaan', '1234d5')