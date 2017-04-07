/**
 * Created by guan on 13/02/17.
 */
'use strict';

const assert = require('chai').assert;
const config = require('./config/config')();
const rp = require('request-promise');
const MongoClient = require('mongodb-promise').MongoClient;

function executeTests(sessionToken) {
    describe('Invite user tests: ', function() {
        const context = {};
        before('Drop invite collection: ', function(done) {
            const context = {};
            MongoClient.connect(config.db)
                .then(function(db) {
                    console.log('Connect successfully. \n');
                    context.db = db;
                    context.db.dropCollection('invites');
                    console.log('Drop collection successfully. \n');
                    done();
                })
                .catch(error => {
                    console.error('Error happened while processing db.\n');
                });
        });

        it('Invite user should success: ', function(done) {
            let options = {
                method: "POST",
                body: {"username": "thamrys1"},
                uri: config.baseUrl + 'api/v1/invite',
                headers:
                    {
                        "YP-Authentication-Token": sessionToken
                    },
                json: true
            };

            rp(options, (err, res, body) => {
                if (err) {
                    console.error(err);
                    done();
                } else {
                    assert.equal(201, res.statusCode);
                    assert.equal(true, body.success);
                    done();
                }
            });
        });

        it('Invite user twice should fail: ', function(done) {
            let options = {
                method: "POST",
                body: {"username": "thamrys1"},
                uri: config.baseUrl + 'api/v1/invite',
                headers:
                    {
                        "YP-Authentication-Token": sessionToken
                    },
                json: true
            };

            rp(options, (err, res, body) => {
                if (err) {
                    console.error(err);
                    done();
                } else {
                    assert.equal(400, res.statusCode);
                    assert.equal(false, body.success);
                    assert.equal("inviter has already invited invitee", body.message);
                    done();
                }
            }).catch(() => {

            });
        });

        it('Invite user already installed should fail: ', function(done) {
            let options = {
                method: "POST",
                body: {"username": "gwang1"},
                uri: config.baseUrl + 'api/v1/invite',
                headers:
                    {
                        "YP-Authentication-Token": sessionToken
                    },
                json: true
            };

            rp(options, (err, res, body) => {
                if (err) {
                    console.error(err);
                    done();
                } else {
                    assert.equal(400, res.statusCode);
                    assert.equal(false, body.success);
                    assert.equal("invitee already installed app", body.message);
                    done();
                }
            }).catch(() => {

            });
        });

    });
}

module.exports = {
    executeTests: executeTests
};