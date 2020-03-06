const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/index");

mongoose
	.connect(config.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("MongoDB is connected..");
	})
	.catch((err) => {
		console.log(err);
	});

//middleware
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use("/users", require("./routes/user"));

//spin the server
app.listen(config.PORT, () => {
	console.log(`Server is Up and Running for ${config.development.sitename}`);
});
