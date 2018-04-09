const express = require('express');
const router = express.Router();

const auth = require('./auth');
const brands = require('./brands');
const categories = require('./categories');
const products = require('./products');
const orders = require('./orders');
const views = require('./views');

function isLoggedIn(req, res, next) {
	// console.log(req.session.key)
	if(!!req.session.key)
		return next();
	else res.redirect('/login');
};

function isNotLoggedIn(req, res, next) {
	// console.log(req.session)
	if(!req.session.key)
		return next();
	else res.redirect('/');
};

// Views
router.get('/login', isNotLoggedIn, views.login);
router.get('/register', isNotLoggedIn, views.register);
router.get('/', isLoggedIn, views.ims);

// Auth
router.post('/register', isNotLoggedIn, auth.register);				// input: name, email, password
router.post('/login', isNotLoggedIn, auth.login);					// input: email, password
router.get('/logout', isLoggedIn, auth.logout);

// Brands
router.get('/brands', isLoggedIn, brands.read);
router.post('/brands', isLoggedIn, brands.create);					// input: name, status { 0 | 1 }
router.put('/brands', isLoggedIn, brands.update);					// input: brand_id, name, status { 0 | 1 }
router.delete('/brands', isLoggedIn, brands.delete);				// input: brand_id

// Categories
router.get('/categories', isLoggedIn, categories.read);
router.post('/categories', isLoggedIn, categories.create);			// input: name, status { 0 | 1 }
router.put('/categories', isLoggedIn, categories.update);			// input: category_id, name, status { 0 | 1 }
router.delete('/categories', isLoggedIn, categories.delete);		// input: category_id

// Products
router.get('/products', isLoggedIn, products.read);
router.post('/products', isLoggedIn, products.create);				// input: name, category_id, brand_id, price, stock, status { 0 | 1 }
router.put('/products', isLoggedIn, products.update);				// input: product_id, name, category_id, brand_id, price, stock, status { 0 | 1 }
router.delete('/products', isLoggedIn, products.delete);			// input: product_id

// Orders
router.get('/orders', isLoggedIn, orders.read);
router.get('/orders/:orderid', isLoggedIn, orders.details);
router.post('/orders', isLoggedIn, orders.create);					// input: order: {customer_name, sub_total, gst, discount, paid}, order_details: [{product_id, quantity, price}]
router.delete('/orders', isLoggedIn, orders.delete);				// input: order_id

module.exports = router;