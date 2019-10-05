const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/index");
const controller = require("./controller/auth");

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB is connected..");
  })
  .catch(err => {
    console.log(err);
  });

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.send({
    name: "Hello Geek!",
    ref: "Order api"
  });
});

app.post("/register", controller.registerUser);
app.post("/login", controller.loginUser);
app.listen(keys.PORT, () => {
  console.log("Server Connected...");
});
