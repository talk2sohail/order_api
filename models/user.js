const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Types = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: String,
	orders: [
		{
			_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
			bought: { type: Boolean, default: false }
		}
	]
});
userSchema.query.byName = function(name) {
	return this.where({ name: new RegExp(name, "i") });
};

userSchema.pre("save", async function(next) {
	try {
		console.log("entered!");

		//userSchema is instantiated
		const user = this;
		if (!user.isModified("password")) {
			next();
		}

		//generate a salt
		const salt = await bcrypt.genSalt(10);
		//generate a password hash
		const passwordHash = await bcrypt.hash(this.password, salt);
		//assign hash password to the original one
		this.password = passwordHash;
	} catch (err) {
		next(err);
	}
});

userSchema.methods.isValidPassword = async function(newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch (err) {
		throw new Error(err);
	}
};

const User = mongoose.model("User", userSchema);

module.exports = User;
