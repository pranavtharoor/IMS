const connection = require('../config/database');

exports.create = (req, res) => {
	if([0, 1].indexOf(req.body.status) !== -1) {
		let sql = `INSERT INTO categories SET ?`;
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
				res.status(200).send({ success: true, msg: 'Category added', data: { category_id: result.insertId } });
		});
	} else
		res.status(422).send({ success: false, msg: 'Invalid input' });
};

exports.read = (req, res) => {
	let sql = `SELECT * FROM categories`;
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
		let sql = `UPDATE categories SET ? WHERE category_id = ?`;
		connection.query(sql, [req.body, req.body.category_id], (err, result) => {
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
					res.status(409).send({ success: false, msg: 'Category already exists' });
				else {
					console.log(err);
					res.status(500).send({ success: false, msg: 'Internal server error' });
				}
			} else if(result.affectedRows === 0)
				res.status(404).send({ success: true, msg: 'Category not found' });
			else
				res.status(200).send({ success: true, msg: 'Category updated' });
		});
	} else
		res.status(422).send({ success: false, msg: 'Invalid input' });
};

exports.delete = (req, res) => {
	let sql = `DELETE FROM categories WHERE category_id = ?`;
	connection.query(sql, [req.body.category_id], (err, result) => {
		if(err) {
			if(err.code === 'ER_ROW_IS_REFERENCED_2') {
				let sql = `UPDATE categories SET status = 0 WHERE category_id = ?`;
				connection.query(sql, [req.body.category_id], (err, result) => {
					if(err) {
						console.log(err);
						res.status(500).send({ success: false, msg: 'Internal server error' });
					} else
						res.status(200).send({ success: true, msg: 'Category disabled' })
				});
			} else {
				console.log(err);
				res.status(500).send({ success: false, msg: 'Internal server error' });
			}
		}
		else if(result.affectedRows === 0)
			res.status(404).send({ success: true, msg: 'Category not found' });
		else
			res.status(200).send({ success: true, msg: 'Category deleted' });
	});
};
