const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, read, update } = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({ user: req.profile });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);

//run the userById method anytime there is a user's Id parameter in the route
//Makes user info (profile) available in the req object
router.param("userId", userById);

module.exports = router;
