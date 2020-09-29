const express = require("express");
const router = express.Router();

const { create, categoryById, read } = require("../controllers/category");

const { userById } = require("../controllers/user");

//@Auth - Only Admin can create a category
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");

//route
router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

//@userById - a middleware func - gets the id of the category creator - See Below line 19-21 for more comments
router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;

//Since the user model was used within the userById func to get the user's id,
//as we have attached the endpoint(/:userId) and the middleware (userById) to this
//The id of the category creator will be gotten
