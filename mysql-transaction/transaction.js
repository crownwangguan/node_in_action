const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'guan',
    password: 'Crown54321',
    database: 'guandb'
});

connection.connect(err => {
    if(err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
});

/* Begin transaction */
connection.beginTransaction(err => {
    if(err) {throw err}
    connection.query('INSERT INTO names SET name=?', 'guan', (err, result) => {
        if (err) { 
            connection.rollback(() => {
                throw err;
            });
        }
        connection.commit(err => {
            if(err) {
                connection.rollback(() => {
                    throw err;
                });
            }
            console.log('Transaction Complete');
            connection.end();
        });
    });
});