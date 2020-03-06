const Joi = require("joi");
module.exports = {
	validateBody: (schema) => {
		try {
			return (req, res, next) => {
				const result = Joi.validate(req.body, schema);
				if (result.error) {
					const name = result.error.name;
					const errorMessage = result.error.details[0].message;
					return res.status(400).json({
						error: name,
						message: errorMessage
					});
				}
				if (!req.value) {
					req.value = {};
				}
				req.value["body"] = req.body;

				next();
			};
		} catch (err) {
			next(err);
		}
	},

	schemas: {
		authSchema: Joi.object().keys({
			email: Joi.string()
				.email()
				.required(),
			password: Joi.string().required()
		})
	}
};
