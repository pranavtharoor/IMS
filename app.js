const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const connection = require('./config/database');
const redisStore = require('./config/redis')(session);
const routes = require('./routes');

// Database connection
connection.connect(err => {
	if(err) console.log('Error connecting to database');
	else console.log('Connected to database');
});

const app = express();

// Middleware
app.use(session({
	secret: 'secret',
	store: redisStore,
	saveUninitialized: false,
	resave: false
}));
app.use(cookieParser('secret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./client/dist'));

// Routing
app.use('/', routes);

const port = 3000;
app.listen(port, () => {
	console.log('Listening on port ' + port);
});