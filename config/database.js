const { Sequelize } = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(
	config.get('mysql_database'),
	config.get('mysql_user'),
	config.get('mysql_password'),
	{
		host: config.get('mysql_host'),
		dialect: 'mysql',
		pool: {
			max: 10,
			min: 0,
		},
		timezone: '+05:30',
	}
);

test();
async function test() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

const db = {};

db.sync = async () => {
	try {
		await db.sequelize.sync();
		console.log('Synced db');
	} catch (ex) {
		console.error('Failed to Sync db: ' + ex.message);
	}
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.dataset = require('../models/dataset')(sequelize, Sequelize);

module.exports = db;
