module.exports = {
	signUp: (req, res, next) => {
		try {
			res.json({
				success: true,
				messgae: "This is signUp route"
			});
		} catch (err) {
			next(err);
		}
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
			res.json({
				success: true,
				messgae: "You got the secret"
			});
		} catch (err) {
			next(err);
		}
	}
};
