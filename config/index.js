const path = require("path");

const config = {
	PORT: process.NODE_ENV || 8080,
	MONGO_URI: "mongodb://localhost:27017/api2",
	production: {
		sitename: "API for order",
		data: {
			order: path.join(__dirname + "../data/order.json")
		}
	},
	development: {
		sitename: "API for order[development]",
		data: {
			order: path.join(__dirname + "../data/order.json")
		}
	}
};

module.exports = config;
