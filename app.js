const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/index");
const User = require("./models/user");
const Order = require("./models/order");

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

bodyParser.urlencoded({
  extended: true
});

app.get("/", (req, res) => {
  res.send("<h1>Hello Wolrd!</h1>");
});

// *** for testing purpose ***
// User.create(
//   {
//     login: "user2",
//     password: "1111"
//   },
//   (err, user) => {
//     if (err) console.log(err);
//     console.log(user);
//   }
// );

// User.findOne({ login: "user1" }, (err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     Order.create(
//       {
//         title: "Food packet",
//         user_id: user._id
//       },
//       (err, order) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(order);
//         }
//       }
//     );
//   }
// });

app.listen(keys.PORT, () => {
  console.log("Server Connected...");
});
