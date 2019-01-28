//mysql数据库的连接池
const mysql = require('mysql');
var pool = mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'',
    database:'xiaofeiniu',
    connectionLimit:15   //连接池中链接的数据大小
});


module.exports = pool;

