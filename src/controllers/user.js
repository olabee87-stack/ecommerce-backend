const User = require("../models/user");

//All logics of the userRoutes
//Exported to the user routes to be called in the routes
exports.signup = async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
    console.log("Saved new user to the db:", user);
  } catch (err) {
    res.status(400).send(err);
    console.log("Unable to save user to the DB");
  }
};
