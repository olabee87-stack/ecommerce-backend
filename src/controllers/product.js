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

//@Update a product
exports.update = (req, res) => {
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

    let product = req.product; //update product with fields received into the req
    product = _.extend(product, fields); //merge updated fields into the product - lodash ext.

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
      res.json({
        product,
        Message: "Update Successful!",
      });
      console.log("Update a product", product);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
  });
};

//Delete a Product
exports.remove = async (req, res) => {
  let product = req.product;

  try {
    await product.remove();
    res.json({
      Message: "Product successfully deleted",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

/**
 * @Fetch user based on the user's query param -
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=asc&limit=4
 * if no query params, return all products
 */

exports.list = async (req, res) => {
  let order = req.query.order ? req.query.order : "asc"; //order is asc by default
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;

  try {
    const product = await Product.find()
      .select("-photo")
      .populate("category") //populate products by category - ref Category model
      .sort([[sortBy, order]])
      .limit(limit);

    res.json({ product });
  } catch (err) {
    return res.status(404).json({
      error: errorHandler(err),
    });
  }
};

//@List all products based on the req.product.category
//returns all products(except the one in the req.product) belonging to the same category
exports.listRelated = async (req, res) => {
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;

  try {
    const products = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    })
      .limit(limit)
      .populate("category", "_id name");
    res.json({ products });
  } catch (err) {
    return res.status(400).json({
      error: "Products not found!",
    });
  }
};

//Ship off to product route
