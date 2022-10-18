const pool = require('../config/mysqlDB').con;
const mysql = require('mysql');

async function findByEmail(email) {
	return await findOne('email', email);
}

async function findById(id) {
	return await findOne('id', id);
}

function findOne(paramName, paramValue) {
	return new Promise((resolve, reject) => {
		try {
			let selectQuery = 'SELECT * FROM ?? WHERE ?? = ? LIMIT 1';
			let query = mysql.format(selectQuery, ['user', paramName, paramValue]);
			pool.query(query, (error, elements) => {
				if (error) {
					console.log(error.message);
					return reject(err);
				}
				// rows fetch
				console.log('Read complete');
				return resolve(elements[0]);
			});
		} catch (err) {
			reject(err);
		}
	});
}

function save(data) {
	return new Promise((resolve, reject) => {
		let insertQuery = 'INSERT INTO ?? (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)';
		let query = mysql.format(insertQuery, [
			'user',
			'id',
			'name',
			'email',
			'password',
			'signUpDate',
			'previousLogin',
			data.id,
			data.name,
			data.email,
			data.password,
			data.signUpDate,
			data.previousLogin,
		]);
		pool.query(query, (err, response) => {
			if (err) {
				return reject(err);
			}
			// rows added
			console.log('Created User');
			return resolve(response);
		});
	});
}

module.exports = { findByEmail, findById, save };
