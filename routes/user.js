const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/user");
const passportonfig = require("../controllers/auth.users");
const { validateBody, schemas } = require("../helper/userHelper");

router
	.route("/signUp")
	.post(validateBody(schemas.authSchema), userController.signUp);
router
	.route("/signIn")
	.post(
		passport.authenticate("local", { session: false }),
		userController.signIn
	);
router
	.route("/secret")
	.get(passport.authenticate("jwt", { session: false }), userController.secret);
router.route("/getcookie").get(userController.getcookie);
router.route("/setcookie").post(userController.setcookie);

module.exports = router;
