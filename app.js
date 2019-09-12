const express = require("express");
const bodyParser = require("body-parser");
const keys = require("./config/index");

const app = express();

bodyParser.urlencoded({
  extended: true
});

app.get("/", (req, res) => {
  res.send("<h1>Hello Wolrd!</h1>");
});

const port = keys.PORT;
app.listen(port, () => {
  console.log("Server Connected...");
});
