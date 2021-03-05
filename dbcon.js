var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_stockke',
  password        : '3270',
  database        : 'cs340_stockke'
});

module.exports.pool = pool;

