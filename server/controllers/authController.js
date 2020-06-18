const bcrypt = require('bcrypt');

module.exports = {
	login: async (req, res) => {
		const db = req.app.get('db'),
			{ username, password } = req.body;

		if (req.session.user) {
			return res.status(412).send('A user is already logged in');
		}

		const [existingUser] = await db.check_username(username);

		//check if username is correct
		if (existingUser) {
			//checks if password is valid
			const authUser = bcrypt.compareSync(password, existingUser.hash_pass);

			if (authUser) {
				//establish session
				req.session.user = {
					userId: existingUser.user_id,
					username: existingUser.username,
					email: existingUser.email,
				};
				return res.status(200).send(req.session.user);
			}
		}
		return res.status(400).send('Username or password is invalid');
	},
	register: async (req, res) => {
		const db = req.app.get('db'),
			{ username, password, email } = req.body;

		//ensure no data is missing
		if (!username || !password || !email) {
			return res.status(400).send('Please provide all required information');
		}

		const [existingUsername] = await db.check_username(username),
			[existingEmail] = await db.check_email(email);

		//check if user exists
		if (existingUsername) {
			return res.status(400).send('User already exists');
		} else if (existingEmail) {
			return res.status(400).send('Email belongs to an existing account');
		}

		//create new account
		const salt = bcrypt.genSaltSync(10),
			hash = bcrypt.hashSync(password, salt),
			[newUser] = await db.register([username, hash, email]);

		//establish session
		req.session.user = {
			userId: newUser.user_id,
			username: newUser.username,
			email: newUser.email,
		};

		res.status(200).send(req.session.user);
	},

	logout: (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	},

	getUser: (req, res) => {
		if (req.session.user) {
			res.status(200).send(req.session.user);
		} else {
			res.status(404).send('No users logged in');
		}
	},

	updateUser: async (req, res) => {
		const db = req.app.get('db'),
			{ userId } = req.params,
			{ username, email, oldPassword, newPassword } = req.body;

		const [existingUser] = await db.check_user_id(+userId);
		console.log(existingUser);

		if (existingUser) {
			const authUser = bcrypt.compareSync(oldPassword, existingUser.hash_pass);
			console.log(authUser);
			if (authUser) {
				let password = newPassword;
				if (!newPassword) {
					password = oldPassword;
				}
				const salt = bcrypt.genSaltSync(10),
					hash = bcrypt.hashSync(password, salt);
				const [updatedUser] = await db.update_user([
					+userId,
					username,
					email,
					hash,
				]);
				console.log(updatedUser);
				req.session.user = {
					userId: updatedUser.user_id,
					username: updatedUser.username,
					email: updatedUser.email,
				};
				console.log(req.session.user);
				return res.status(200).send(req.session.user);
			}
		}
		res.status(400).send('unable to update account');
	},

	deleteUser: (req, res) => {
		const db = req.app.get('db'),
			{ userId } = req.params;

		req.session.destroy();

		db.delete_user(+userId)
			.then(() => res.sendStatus(200))
			.catch(() => res.status(500).send('unable to delete account'));
	},
};
