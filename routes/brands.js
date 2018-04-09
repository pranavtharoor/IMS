const connection = require('../config/database');

exports.create = (req, res) => {
	if([0, 1].indexOf(req.body.status) !== -1) {
		let sql = `INSERT INTO brands SET ?`;
		connection.query(sql, req.body, (err, result) => {
			if(err) {
				if(
					err.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD' ||
					err.code === 'ER_DATA_TOO_LONG' ||
					err.code === 'ER_NO_DEFAULT_FOR_FIELD' ||
					err.code === 'ER_BAD_NULL_ERROR' ||
					err.code === 'ER_BAD_FIELD_ERROR'
					)
					res.status(422).send({ success: false, msg: 'Invalid input' });
				else {
					console.log(err);
					res.status(500).send({ success: false, msg: 'Internal server error' });
				}
			} else
				res.status(200).send({ success: true, msg: 'Brand added', data: { brand_id: result.insertId } });
		});
	} else
		res.status(422).send({ success: false, msg: 'Invalid input' });
};

exports.read = (req, res) => {
	let sql = `SELECT * FROM brands`;
	connection.query(sql, (err, result) => {
		if(err) {
			console.log(err);
			res.status(500).send({ success: false, msg: 'Internal server error' });
		} else
			res.status(200).send({ success: true, data: result });
	});
};

exports.update = (req, res) => {
	if([0, 1].indexOf(req.body.status) !== -1) {
		let sql = `UPDATE brands SET ? WHERE brand_id = ?`;
		connection.query(sql, [req.body, req.body.brand_id], (err, result) => {
			if(err) {
				if(
					err.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD' ||
					err.code === 'ER_DATA_TOO_LONG' ||
					err.code === 'ER_NO_DEFAULT_FOR_FIELD' ||
					err.code === 'ER_BAD_NULL_ERROR' ||
					err.code === 'ER_BAD_FIELD_ERROR'
					)
					res.status(422).send({ success: false, msg: 'Invalid input' });
				else if(err.code === 'ER_DUP_ENTRY')
					res.status(409).send({ success: false, msg: 'Brand already exists' });
				else {
					console.log(err);
					res.status(500).send({ success: false, msg: 'Internal server error' });
				}
			} else if(result.affectedRows === 0)
				res.status(404).send({ success: true, msg: 'Brand not found' });
			else
				res.status(200).send({ success: true, msg: 'Brand updated' });
		});
	} else
		res.status(422).send({ success: false, msg: 'Invalid input' });
};

exports.delete = (req, res) => {
	let sql = `DELETE FROM brands WHERE brand_id = ?`;
	connection.query(sql, [req.body.brand_id], (err, result) => {
		if(err) {
			if(err.code === 'ER_ROW_IS_REFERENCED_2') {
				let sql = `UPDATE brands SET status = 0 WHERE brand_id = ?`;
				connection.query(sql, [req.body.brand_id], (err, result) => {
					if(err) {
						console.log(err);
						res.status(500).send({ success: false, msg: 'Internal server error' });
					} else
						res.status(200).send({ success: true, msg: 'Brand disabled' })
				});
			} else {
				console.log(err);
				res.status(500).send({ success: false, msg: 'Internal server error' });
			}
		}
		else if(result.affectedRows === 0)
			res.status(404).send({ success: true, msg: 'Brand not found' });
		else
			res.status(200).send({ success: true, msg: 'Brand deleted' });
	});
};
