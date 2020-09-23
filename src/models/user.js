const mongoose = require("mongoose");
const validator = require("validator"); //to add vaidation to schema objects
const uuid = require("uuid/v1");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: 32,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    hashed_password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error(`Password cannot include the word 'password'`);
        }
      },
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

//@hash password - will be stored virtually, not on the user model
// hence, the virtual property
userSchema
  .virtual("password")
  .set(function (password) {
    const user = this;

    user._password = password;
    user.salt = uuidv1();
    user._password = user.encryptPassword(password);
  })
  .get(function () {
    return user._password;
  });

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", user.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
