const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
// const { ObjectId } = mongoose.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId, // Relationship to the Category model
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String, //image type... jpg, png etc
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;

//Ship off to product controller
