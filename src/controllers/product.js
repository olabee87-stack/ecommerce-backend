const formidable = require("formidable");
const _ = require("lodash");
const Product = require("../models/product");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");

//@Find a single product by Id
exports.productById = async (req, res, next, id) => {
  await Product.findById(id).exec((err, product) => {
    if (err || !product) {
      res.status(400).json({
        error: "Product with the given ID is not found!",
      });
    }
    req.product = product; //make found project available in the req.object
    next();
  });
};

//@Read a single product
exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json({ product: req.product });
};

//@Create Product
exports.create = async (req, res) => {
  let form = new formidable.IncomingForm(); //all form data will be available from here
  form.keepExtensions = true; //keep all photo extensions- eg jpg, png etc
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded!" });
    }

    //check that fields are correct
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required!",
      });
    }

    let product = new Product(fields); //create new product with fields received into the req

    //if photo was passed on the clientside - 1kb=1000, 1mb=1000000
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path); //photo.data - coming from the product model
      product.photo.contentType = files.photo.type; //also from the product model - contentType eg png, jpet etc
    }

    try {
      product.save();
      res.status(201).json({
        product,
      });
      console.log("Created a new product", product);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
  });
};

//Ship off to product route
