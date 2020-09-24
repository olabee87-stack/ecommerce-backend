const User = require("../models/user");

exports.userById = async (req, res, next, id) => {
  await User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found..." });
    }
    req.profile = user; //store the user gotten from the db as req.profile
    next();
  });
};

//"Ship of to userRoutes.js"
