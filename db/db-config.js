var mysql = require('mysql2');

module.exports.pool = mysql.createPool({
  host: "bs2axn00kya2bfahhkok-mysql.services.clever-cloud.com",
  user: "ud6cfvo0k53xr6t9",
  password: "IXSrKjxFE9FFxmuMlzJE",
  database: "bs2axn00kya2bfahhkok",
  port: 3306,
  connectionLimit: 20,
  waitForConnections: true,
  queueLimit: 0
});