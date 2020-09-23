const express = require("express");
const { hiBabe } = require("../controllers/user");
const router = express.Router();

router.get("/", hiBabe);

module.exports = router;
