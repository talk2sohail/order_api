const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const morgan = require("morgan");
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
app.use(cookieparser());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use("/", require("./routes/user"));

//spin the server
app.listen(config.PORT, () => {
	console.log(`Server is Up and Running for ${config.development.sitename}`);
});
