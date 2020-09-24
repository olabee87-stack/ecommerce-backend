const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler"); //handle DB error msg

//@All logics of the userRoutes

//@User signUp validator - registration
exports.signup = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).json({ user });
    console.log("Saved new user to the db:", user);
  } catch (err) {
    res.status(400).json({
      err: errorHandler(err),
    });
    console.log("Unable to save user to the DB");
  }
};

//@Shipped off to the user route..
