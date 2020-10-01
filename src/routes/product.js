const express = require("express");
const router = express.Router();

//@Product Controller/Middleware
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
} = require("../controllers/product");

//@Auth Middleware
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");

//@Middleware to get the user's ID
const { userById } = require("../controllers/user");

//Route
router.get("/product/:productId", read); //read
router.get("/products", list); //List all products
router.get("/products/related/:productId", listRelated); //@list related products
router.get("/products/categories", listCategories); //@list all categories based on products
router.post("/products/by/search", listBySearch); //@api call to the backend by users, based on wants
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create); //create

router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
); //delete

router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
); //update

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
