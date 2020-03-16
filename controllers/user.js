const JWT = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../config");

signToken = (user) => {
	return JWT.sign(
		{
			iss: "talk2sohail",
			sub: user.id,
			iat: new Date().getTime(), // current time
			exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
		},
		JWT_SECRET
	);
};
module.exports = {
	signUp: async (req, res, next) => {
		//if user input is bad
		if (req._error) {
			const { name, details } = req._error;
			return res.status(422).json({
				success: "false",
				name: name,
				message: details[0].message
			});
		}
		const { email, password } = req.value.body;

		// Check if there is a user with the same email
		const foundUser = await User.findOne({ email });
		if (foundUser) {
			return res.status(403).json({
				success: "false",
				message: "email already in use"
			});
		}
		// // Create a new user
		const newUser = new User({
			email,
			password
		});
		await newUser.save();

		// // Generate the token
		const token = signToken(newUser);

		// // Respond with token
		res.status(200).json({ token });
	},
	signIn: (req, res, next) => {
		try {
			res.json({
				success: true,
				messgae: "This is signIn route"
			});
		} catch (err) {
			next(err);
		}
	},
	secret: (req, res, next) => {
		try {
			console.log("Cookies: ", req.cookies);
			res.json({
				success: true,
				messgae: "You got the secret"
			});
		} catch (err) {
			next(err);
		}
	},
	getcookie: (req, res, next) => {
		try {
			const username = req.cookies["username"];
			if (username) {
				res.json({
					name: username
				});
			}
		} catch (err) {
			next(err);
		}
	},
	setcookie: (req, res, next) => {
		try {
			res
				.cookie("username", "sohail", {
					expires: new Date(Date.now() + 900000),
					httpOnly: true
				})
				.json({
					msg: "cookie sent."
				});
		} catch (err) {
			next(err);
		}
	}
};
