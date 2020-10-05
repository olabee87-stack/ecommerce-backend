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

//"Ship of to userRoutes.js"
