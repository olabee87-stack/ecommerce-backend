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
