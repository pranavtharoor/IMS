const connection = require('../config/database');

exports.create = (req, res) => {
	connection.beginTransaction(err => {
		if(err)
			res.status(500).send({ status: false, msg: 'Internal server error' });
		else {
			let sql = `INSERT INTO orders SET ?`;
			connection.query(sql, req.body.order, (err, result) => {
				if(err)
					connection.rollback(onRollback(err));
				else {
					let orderDetails = req.body.order_details === undefined
									? []
									: req.body.order_details.map(od => [ result.insertId, od.product_id, od.quantity, od.price ]);
					let sql = `INSERT INTO order_details(order_id, product_id, quantity, price) VALUES ?`;
					connection.query(sql, [orderDetails], (err, result) => {
						if(err)
							connection.rollback(onRollback(err));
						else
							connection.commit((err) => {
								if(err)
									connection.rollback(onRollback(err));
								else
									res.status(200).send({ success: true, msg: 'Order added', data: { order_id: result.insertId } });
							});
					});
				}
			});
		}
	});

	function onRollback(err) {
		console.log(err)
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
	}

};

exports.read = (req, res) => {
	let sql = `SELECT * FROM orders`;
	connection.query(sql, (err, result) => {
		if(err) {
			console.log(err);
			res.status(500).send({ success: false, msg: 'Internal server error' });
		} else
			res.status(200).send({ success: true, data: result });
	});
};

exports.delete = (req, res) => {
	let sql = `DELETE FROM orders WHERE order_id = ?`;
	connection.query(sql, [req.body.order_id], (err, result) => {
		if(err) {
			console.log(err);
			res.status(500).send({ success: false, msg: 'Internal server error' });
		}
		else if(result.affectedRows === 0)
			res.status(404).send({ success: true, msg: 'Order not found' });
		else
			res.status(200).send({ success: true, msg: 'Order deleted' });
	});
};

exports.details = (req, res) => {
	let sql = `	
				SELECT od_id, order_id, order_details.product_id, quantity, order_details.price, name as product_name
				FROM order_details JOIN products ON order_details.product_id = products.product_id
				WHERE order_id = ?
			`;
	connection.query(sql, req.params.orderid, (err, result) => {
		if(err) {
			console.log(err);
			res.status(500).send({ success: false, msg: 'Internal server error' });
		} else
			res.status(200).send({ success: true, data: result });
	});
};