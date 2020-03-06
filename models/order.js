const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const orderSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now()
	},
	updated_at: {
		type: Date,
		default: Date.now()
	},
	user_id: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	]
});
orderSchema.query.byName = function(name) {
	return this.where({ name: new RegExp(name, "i") });
};
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
