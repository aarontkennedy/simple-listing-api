
const { exception } = require('console');
//
//  The connection needed for the database
//
const fs = require('fs');
const path = require('path');
const keyPath = path.join(__dirname, 'mySQLkeys.json');
let keys = null;
if (fs.existsSync(keyPath)) {
    keys = require(keyPath);
}
else {
    throw new exception('mysSQLkeys.json is missing');
}

module.exports = {
    connectionLimit : 100, //important
    host: keys.host,
    port: keys.port,
    user: keys.user,
    password: keys.password,
    database: keys.database,
    debug : false
};