const path = require('path');

exports.login = (req, res) => {
	res.status(200).send(`
		<style>
			body {
				display: flex;
				font-family: Verdana;
				justify-content: center;
				align-items: center;
				font-size: 1.3rem;
			}
			button {
				background: #111;
				color: white;
				border: none;
				padding: 8px 15px;
				border-radius: 2px;
			}
			input {
				border: none;
				border-bottom: solid 2px;
				font-size: 1.1rem;
				font-family: Verdana;
			}
			a {
				text-decoration: none;
				color: black;
				position: fixed;
				top: 30px;
				right: 30px;
				background: #ccc;
				padding: 8px 12px;
				border-radius: 4px;
			}
		</style>
		<div>
			<a href="/register">Register</a>
			Login<br /><br />
			<form id="login" action="/login" method="post">
				<input placeholder="Email" type="email" name="email" />
				<input placeholder="Password" type="password" name="password" />
				<button type="submit">Login</button>
			</form>
		</div>
		`);
};

exports.register = (req, res) => {
	res.status(200).send(`
		<style>
			body {
				display: flex;
				font-family: Verdana;
				justify-content: center;
				align-items: center;
				font-size: 1.3rem;
			}
			button {
				background: #111;
				color: white;
				border: none;
				padding: 8px 15px;
				border-radius: 2px;
			}
			input {
				border: none;
				border-bottom: solid 2px;
				font-size: 1.1rem;
				font-family: Verdana;
			}
			a {
				text-decoration: none;
				color: black;
				position: fixed;
				top: 30px;
				right: 30px;
				background: #ccc;
				padding: 8px 12px;
				border-radius: 4px;
			}
		</style>
		<div>
			<a href="/login">Login</a>
			Register<br /><br /><br />
			<form action="/register" method="post">
				<input placeholder="Name" type="text" name="name" />
				<input placeholder="Email" type="email" name="email" />
				<input placeholder="Password" type="password" name="password" />
				<button type="submit">Register</button>
			</form>
		</div>
		`);
};

exports.ims = (req, res) => {
	res.status(200).sendFile('./ims.html', { root: path.join(__dirname, '../client/dist') });
};