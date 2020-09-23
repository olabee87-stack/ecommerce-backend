const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

//@DB connection
const connectDB = require("./config/db");
connectDB();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(__dirname + "/access.log", {
  flags: "a",
});

//@Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined", { stream: accessLogStream })); //to log http requests

//@Routes
app.use("/api", userRoutes);

//@Listening Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
