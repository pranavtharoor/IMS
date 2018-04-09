const validator = require('validator');
const connection = require('../config/database');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
	let { name, email, password } = req.body;
	if(!!email && !!name && !!password && validator.isEmail(email.toString()))
		saltAndHash(password, (err, hash) => {
			if(err) {
				console.log(err);
				res.redirect('/register');
			} else {
				let sql = `INSERT INTO users SET ?`;
				connection.query(sql, { ...req.body, password: hash }, (err, result) => {
					if(err) {
						if(err.code === 'ER_DUP_ENTRY')
							res.redirect('/register');
						else {
							console.log(err);
							res.redirect('/register');
						}
					} else
						res.redirect('/login');
				});
			}
		});
	else
		res.redirect('/register');
};

exports.login = (req, res) => {
	let { email, password } = req.body;
	if(!!email && !!password) {
		let sql = `SELECT * FROM users WHERE email = ?`;
		connection.query(sql, email, (err, result) => {
			if(err) {
				console.log(err);
				res.redirect('/login');
			} else if(result.length == 0)
				res.redirect('/register');
			else {
				comparePasswords(password, result[0].password, (err, isMatch) => {
					if(isMatch) {
						req.session.key = result[0];
						res.redirect('/');
					} else
						res.redirect('/login');
				});
			} 
		});
	} else
		res.redirect('/login');

	function comparePasswords(password, hash, done) {
		bcrypt.compare(password, hash, (err, isMatch) => {
				if(err) done(err, null);
				else done(null, isMatch);
		});
	}
};

exports.logout = (req, res) => {
	if(req.session.key)
		req.session.destroy(() => {
		  res.status(302).redirect('/login');
		});
	else
		res.status(302).redirect('/login');
};

function saltAndHash(password, done) {
	bcrypt.genSalt(10, (err, salt) => {
		if(err) {
			console.log(err);
			done(err, null);
		} else 
			bcrypt.hash(password, salt, (err, hash) => {
				if(err) {
					console.log(err);
					done(err, null);
				} else
					done(null, hash);
			});
	});
}


// const validator = require('validator');
// const connection = require('../config/database');
// const bcrypt = require('bcryptjs');

// exports.register = (req, res) => {
// 	let { name, email, password } = req.body;
// 	if(!!email && !!name && !!password && validator.isEmail(email.toString()))
// 		saltAndHash(password, (err, hash) => {
// 			if(err) {
// 				console.log(err);
// 				res.status(500).send({ success: false, msg: 'Internal server error' });
// 			} else {
// 				let sql = `INSERT INTO users SET ?`;
// 				connection.query(sql, { ...req.body, password: hash }, (err, result) => {
// 					if(err) {
// 						if(err.code === 'ER_DUP_ENTRY')
// 							res.status(409).send({ success: false, msg: 'User already exists' });
// 						else {
// 							console.log(err);
// 							res.status(500).send({ success: false, msg: 'Internal server error' });
// 						}
// 					} else
// 						res.status(200).send({ success: true, msg: 'Registration successful' });
// 				});
// 			}
// 		});
// 	else
// 		res.status(422).send({ success: false, msg: 'Invalid input' });
// };

// exports.login = (req, res) => {
// 	let { email, password } = req.body;
// 	if(!!email && !!password) {
// 		let sql = `SELECT * FROM users WHERE email = ?`;
// 		connection.query(sql, email, (err, result) => {
// 			if(err) {
// 				console.log(err);
// 				res.status(500).send({ success: false, msg: 'Internal server error' });
// 			} else if(result.length == 0)
// 				res.status(404).send({ success: false, msg: 'User not registered' });
// 			else {
// 				comparePasswords(password, result[0].password, (err, isMatch) => {
// 					if(isMatch) {
// 						req.session.key = result[0];
// 						res.status(200).send({ success: true, msg: 'Logged in' });
// 					} else
// 						res.status(401).send({ success: false, msg: 'Incorrect credentials' });
// 				});
// 			} 
// 		});
// 	} else
// 		res.status(422).send({ success: false, msg: 'Invalid input' });

// 	function comparePasswords(password, hash, done) {
// 		bcrypt.compare(password, hash, (err, isMatch) => {
// 				if(err) done(err, null);
// 				else done(null, isMatch);
// 		});
// 	}
// };

// exports.logout = (req, res) => {
// 	if(req.session.key)
// 		req.session.destroy(() => {
// 		  res.status(302).redirect('/home');
// 		});
// 	else
// 		res.status(302).redirect('/home');
// };

// function saltAndHash(password, done) {
// 	bcrypt.genSalt(10, (err, salt) => {
// 		if(err) {
// 			console.log(err);
// 			done(err, null);
// 		} else 
// 			bcrypt.hash(password, salt, (err, hash) => {
// 				if(err) {
// 					console.log(err);
// 					done(err, null);
// 				} else
// 					done(null, hash);
// 			});
// 	});
// }
