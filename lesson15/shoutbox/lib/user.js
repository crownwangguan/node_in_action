const mysql = require('mysql');
const bcrypt = require('bcrypt');

const db = mysql .createConnection({
    host: '127.0.0.1',
    user: 'guan',
    password: '123456',
    database: 'guandb'
});

const saltRounds = 12;
const _hashPassword = function(password) {
    return bcrypt.hash(password, saltRounds);
};

const saveUser = function(name, password, age) {
    db.connect();
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
    db.connect();
    let queryString = `SELECT * FROM user WHERE name='${name}';`
    db.query(queryString, (err, result) => {
        if(err) {
            console.error(err);
            return callback(err);
        } else {
            if (typeof result !== 'undefined' && result.length > 0) {
                db.end();
                return callback(null, result);
            } else {
                db.end();
                return callback('No user found', null);
            }
        }
    });
};

const _getPasswordByName = function(name, callback) {
    db.connect();
    let queryString = `SELECT CONVERT(password USING utf8) as _pass FROM user WHERE name='${name}';`
    db.query(queryString, (err, result) => {
        if(err) {
            console.error(err);
            return callback(err);
        } else {
            if (typeof result !== 'undefined' && result.length > 0) {
                return callback(null, result);
            } else {
                return callback('No user found', null);
            }
        }
    });
};

const authenticate = function(name, pass) {
    _getPasswordByName(name, (err, user) => {
        if(err) {
            console.error(err);
            return db.end();
        }
        
        bcrypt.compare(pass, user[0]._pass, (err, result) => {
            if (err) { throw (err); }
            if (result) {
                console.log('Login successfully.');
            } else {
                console.log('Wrong password.');
            }
            db.end();
        });
    });
};

// saveUser('asdf', '12345', 25);

// getByName('guaan', (err, result) => {
//     console.log(result)
// });

authenticate('asdf', '12345');