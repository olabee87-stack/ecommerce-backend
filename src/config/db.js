const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionURL = await mongoose.connect(
      process.env.MONGODB_URL,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log(`Mongo DB connected!`);
  } catch (err) {
    console.log(`Unable to connect to the DB: ${err}`);
  }
};

module.exports = connectDB;

//Shiped off to the app.js
