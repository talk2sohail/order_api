const mongoose = require("mongoose");
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
const User = mongoose.model("User", userSchema);

module.exports = User;
