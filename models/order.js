const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const userSchema = new Schema({
  title: String,
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

const Order = mongoose.model("Order", userSchema);

module.exports = Order;
