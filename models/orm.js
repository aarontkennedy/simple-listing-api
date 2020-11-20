const databaseConnectionInfo = require("./mySQLconnection.js");
const mysql = require("mysql");
const pool = mysql.createPool(databaseConnectionInfo);

function performDatabaseCall(queryStr, parameters = null) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            console.log('connected as id ' + connection.threadId);

            // conduct the actual requested query
            var query = connection.query(queryStr, parameters, function (err, result) {
                if (err) {
                    reject(err);
                }
                connection.release();
                resolve(result);
            });
            console.log(query.sql);
        });
    });
}

const orm = {
    createListing: function (
        mlsNumber,
        address,
        city,
        state,
        zip,
        country,
        listDate,
        price,
        agentId
    ) {
        let queryString = `
        INSERT INTO listings (mls_number, address, city, state, zip, country, list_date, price, agent_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
               `;

        return performDatabaseCall(queryString,
                    [mlsNumber,
                    address,
                    city,
                    state,
                    zip,
                    country,
                    listDate,
                    price,
                    agentId]);
    },
    get: function (mlsNumber) {
        let queryString = `SELECT * FROM listings WHERE mls_number = ?;`;
        return performDatabaseCall(queryString, [mlsNumber]);
    },
    getByAgent: function (agentId) {
        let queryString = `SELECT * FROM listings WHERE agent_id = ?;`;
        return performDatabaseCall(queryString, [agentId]);
    },
    delete: function (mlsNumber) {
        let queryString = `DELETE FROM listings WHERE mls_number = ?;`;
        return performDatabaseCall(queryString, [mlsNumber]);
    },
    update: function (mlsNumber, properties) {
        if (!properties || properties.length < 1) {
            return 'nothing updated';
        }

        console.log(properties);

        let queryString = `UPDATE listings SET ? WHERE mls_number = ?;`;

        return performDatabaseCall(queryString, [properties, mlsNumber]);
    },
};

module.exports = orm;
