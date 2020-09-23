const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const userRoute = require("./routes/userRoute");
require("dotenv").config();

const app = express();

//@DB connection
const connectDB = require("./config/db");
connectDB();

//@pass incoming json to an object
app.use(express.json());

//@Routes
app.use(userRoute);

//@Morgan for logging http req
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(__dirname + "/access.log", {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

//@Listening Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
