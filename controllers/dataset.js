const db = require('../config/database');
const Dataset = db.dataset;
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');

// Retrieve all Datasets from the database.
exports.findAll = async (req, res) => {
	var params = {};
	if (typeof req.query.limit !== 'undefined') {
		if (!isNaN(req.query.limit)) {
			params = {
				offset: parseInt(req.query.offset) || 0,
				limit: parseInt(req.query.limit),
			};
		} else {
			return res.status(400).send('Incorrect Query Params');
		}
	}

	try {
		var data = await Dataset.findAll(params);
		res.json(data);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
};

exports.findByIdOrName = async (req, res) => {
	try {
		if (typeof req.query.id !== 'undefined') {
			var dataset = await Dataset.findByPk(req.query.id);
			return res.json(dataset);
		} else if (typeof req.query.name !== 'undefined') {
			var dataset = await Dataset.findOne({ where: { name: req.query.name } });
			return res.json(dataset);
		} else {
			return res.status(400).send('Incorrect Query Params');
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
};

// Adding new dataset
exports.create = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, link, description, tags, categories, isPaid } = req.body;
	try {
		const dataset = await Dataset.create({
			name,
			link,
			description,
			tags,
			categories,
			isPaid,
		});

		res.send(dataset);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

exports.bulkCreate = async (req, res) => {
	// console.log(req.file);
	var csv = req.file.buffer.toString('utf8');

	try {
		csvJson = await convertIntoJson(csv);
		const datasets = await Dataset.bulkCreate(csvJson);
		res.send(`Created ${datasets.length} Records`);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

const convertIntoJson = async (csv) =>
	new Promise((resolve, reject) => {
		try {
			csv = csv.split('\n');
			var jsonObj = [];
			var headers = csv[0].split(',');
			for (var i = 1; i < csv.length; i++) {
				var data = csv[i].split(',');
				if (data[0] == '' || data[1] == '') {
					continue;
				}
				var obj = {};
				for (var j = 0; j < data.length; j++) {
					obj[headers[j].trim()] = data[j].trim();
				}
				jsonObj.push(obj);
			}
			resolve(jsonObj);
		} catch (err) {
			reject(err);
		}
	});
