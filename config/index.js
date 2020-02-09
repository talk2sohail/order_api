const key = {
	PORT: process.argv.PORT || 8080,
	mongoURI: "mongodb://localhost/api2"
};
const development = {
	development: {
		sitename: "API for order[development]",
		data: {
			order: path.join(__dirname + "../data/order.json")
		}
	}
};
const production = {
	production: {
		sitename: "API for order",
		data: {
			order: path.join(__dirname + "../data/order.json")
		}
	}
};

module.exports = {
	key,
	development,
	production
};
