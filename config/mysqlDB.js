var mysql = require('mysql');
var config = require('config');

var con = mysql.createConnection({
	host: config.get('mysql_host'),
	user: config.get('mysql_user'),
	password: config.get('mysql_password'),
	database: config.get('mysql_database'),
});

con.connect((err) => {
	if (err) throw err;
	console.log(`MySQL connected...`);
});

const pool = mysql.createPool({
	connectionLimit: 10, //important
	host: config.get('mysql_host'),
	user: config.get('mysql_user'),
	password: config.get('mysql_password'),
	database: config.get('mysql_database'),
	debug: false,
});

module.exports = { con, pool };
