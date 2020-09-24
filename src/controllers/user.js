const User = require("../models/user");
const jwt = require("jsonwebtoken"); //to generate signed token
const expressJwt = require("express-jwt"); //for authorization check
require("dotenv");

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

//@Sign in validator - Log in   //find if user's email exists
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  await User.findOne(
    {
      email,
    },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that email does not exist, please signup",
        });
      }

      //Make sure the email and password matches if the user is found
      //Create authenticate method in the user model
      if (!user.authenticate(password)) {
        return res
          .status(401)
          .json({ error: "Email and password do not match" });
      }

      // const user = this
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET); //auth token - .env
      //rename token as 't' and include expiry date
      res.cookie("t", token, { expire: new Date() + 9999 }); //expires in 9999 milliseconds
      //return response with user and token to the frontend client
      const { _id, name, email, role } = user;
      return res.json({ token, user: { _id, email, name, role } });
    }
  );
};

//@Sign out
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout Success" });
};

//@Middleware to ensure that only logged in users can access routes
//@secret compares the secret used for the token generation with the user tryig to access the route
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

//@Shipped off to the user route..
