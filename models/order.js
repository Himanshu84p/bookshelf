const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  books: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
