const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
    },
    name: String,
    price: Number,
    count: Number,
  },
  {
    timestamps: true,
  }
);

const CartItem = new mongoose.model("CartItem", CartItemSchema);

//@Order Schema
const OrderSchema = new mongoose.Schema(
  {
    products: [CartItemSchema], //saving the products with the defined cartItem Schema
    transaction_id: {},
    amount: {
      type: Number,
    },
    address: String,
    status: {
      type: String,
      default: "Not processed", //default status, will be changed according to order to the below enum status
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ], //enum - means string objects
    },
    updated: Date,
    user: {
      type: ObjectId, //associated User making the order
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Order = new mongoose.model("Order", OrderSchema);
module.exports = { Order, CartItem };
