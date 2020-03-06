const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { validateBody, schemas } = require("../helper/userHelper");

router
	.route("/signUp")
	.post(validateBody(schemas.authSchema), userController.signUp);
router.route("/signIn").post(userController.signIn);
router.route("/secret").get(userController.secret);

module.exports = router;
