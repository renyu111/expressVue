//连接池
var mysql = require("mysql");
var pool = mysql.createPool({ host: 'localhost', user: 'root', password: 'RENYU111', database: 'dengruo', port: 3306 });


const query = function (sql) {
    return new Promise((resolve, reject) => {
        try {
            pool.getConnection((err1, connection) => {
                if (err1) {
                    reject(err1);
                } else {
                    connection.query(sql, (err2, results) => {
                        connection.release();
                        err2 ? reject(err2) : resolve(results)
                    });
                }
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = query;
