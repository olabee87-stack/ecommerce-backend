const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = async (req, res) => {
  const category = new Category(req.body); //@product input on the clientside
  try {
    await category.save();
    res.status(201).json({
      category,
    });
    console.log("A new category has been created", category);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

//@Find category by ID
exports.categoryById = async (req, res, next, id) => {
  await Category.findById(id).exec((err, category) => {
    if (err || !category) {
      res.status(400).json({
        error: "Category with the given ID is not found!",
      });
    }
    req.category = category; //make found project available in the req.object
    next();
  });
};

//@Read a single product
exports.read = (req, res) => {
  return res.json({ Category: req.category });
};
