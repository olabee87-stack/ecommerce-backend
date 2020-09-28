const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");

//@Import Routes
const userAuthRoutes = require("./routes/auth"); //user authentication
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/category");

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
app.use(expressValidator()); //validate user's input
app.use(cors());

//@Routes Middleware
app.use("/api", userAuthRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);

//@Listening Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
