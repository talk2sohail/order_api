const Joi = require("joi");
module.exports = {
	validateBody: (schema) => {
		try {
			return (req, res, next) => {
				const result = Joi.validate(req.body, schema);

				//this validate the error but user is created in the DB
				if (result.error) {
					req._error = req._error ? {} : null;
					req._error = result.error;
					// next(result.error);
				} else {
					if (!req.value) {
						req.value = {};
					}
					req.value["body"] = req.body;
				}
				next();
			};
		} catch (err) {
			next(err);
		}
	},

	schemas: {
		authSchema: Joi.object().keys({
			email: Joi.string()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
				.required(),
			password: Joi.string()
				.required()
				.min(5)
		})
	}
};
