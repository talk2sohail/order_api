const User = require("../models/user");

const registerUser = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password
  };
  if (req.body) {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err) console.log(err);
      else {
        if (foundUser) {
          res.json({
            success: false,
            message: "Registration failed. User with given email exists."
          });
        }
      }
    });
  }

  User.create(newUser)
    .then(() => {
      res.json({
        success: true,
        message: "The User is now logged in."
      });
    })
    .catch(err => {
      console.log(err);
    });
};

const loginUser = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  // const result = authService.authenticate(user);
  // console.log(user);
  // console.log(result);
  if (user) {
    User.findOne(
      { email: user.email, password: user.password },
      (err, foundUser) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            success: true,
            message: "The User has been logged in."
          });
        }
      }
    );
  } else {
    res.json({
      success: false,
      message: "Login Failed. Unexpected error."
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};
