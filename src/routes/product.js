const express = require("express");
const router = express.Router();

//@Product Controller
const { create, productById } = require("../controllers/product");

//@Auth Middleware
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");

//@Middleware to get the user's ID
const { userById } = require("../controllers/user");

//Route
router.get("/product/:productId");
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
