const express = require("express");

const app = express();

//@DB connection
const connectDB = require("./config/db");
connectDB();
