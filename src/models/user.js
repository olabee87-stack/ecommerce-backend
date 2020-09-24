const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
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
    },
    hashed_password: {
      type: String,
      required: true,
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

//@encrypt passsword with crypto
//@authenticate method - called within the user controller when a user is logging in
//@password accepted at input is compared with the hashed_password (hashed when registering)
//user can only log in if the password they provide matches the stored one (during registration)
userSchema.methods = {
  authenticate: function (password) {
    return this.encryptPassword(password) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

//@Using the encrypted function from up above to hash the passsword
//@hash password - will be stored virtually, not on the user model
// hence, the virtual property
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//@Hide hashed password and salt from view
//@This method will remove the hashed password and the salt string when sent to the client
//@Logic works on the signup user controller logic before being shipped off to the user route
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.hashed_password;
  delete userObject.salt;

  return userObject;
};

//@Authenticate User before logging in

const User = new mongoose.model("User", userSchema);
module.exports = User;
