const mysql = require('mysql');

// MySql configuration
const databaseConfig = {
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'ims'
};

module.exports = mysql.createConnection(databaseConfig);