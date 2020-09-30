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

//@Read a single category
exports.read = (req, res) => {
  return res.json({ Category: req.category });
};

//@Read all categories
exports.list = async (req, res) => {
  try {
    const category = await Category.find();
    res.json({ category });
  } catch (err) {
    res.status(400).json({ error: errorHandler(err) });
  }
};

//@Update a category
exports.update = async (req, res) => {
  const category = req.category;
  try {
    category.name = req.body.name; //set the new changes to name to the req.body
    await category.save();
    res.json({ category });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

//@Remove a category
exports.remove = async (req, res) => {
  let category = req.category;

  try {
    await category.remove();
    res.json({ Message: "Category successfully removed!" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

//Ship off to the category route
