const User = require("../models/user");

//@Middleware to find user by ID in the route.param
exports.userById = async (req, res, next, id) => {
  await User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found..." });
    }
    req.profile = user; //store the user gotten from the db as req.profile
    next();
  });
};

//@Read profile - user
exports.read = async (req, res) => {
  res.json(req.profile); //the user is available on the req.profile
};

//@Update - @set - whatever the user inputs to the req.body
// @new - send the new update back to user
exports.update = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true }
    );
    res.json({ user });
  } catch (err) {
    res.status(400).json({
      error: "You are not authorised to perform this action",
    });
  }
};

//@middleware func- to push orders to the user's history before making the order - ship to order routes
exports.addOrderToUserHistory = async (req, res, next) => {
  let history = [];

  //get all products from the order object(model) and push to the user's order history array
  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });
  //update the user (User model - @history) with the order(products) placed
  await User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error: `Could not update the user's purchase history`,
        });
      }
      next();
    }
  );
};

//"Ship of to userRoutes.js"
