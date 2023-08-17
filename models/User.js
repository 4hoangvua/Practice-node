const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide email."],
    math: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password."],
    // minLength: 3,
  },
  name: {
    type: String,
    required: [true, "Please provide name."],
    minLength: 3,
    maxLength: 50,
  },
});
module.exports = mongoose.model("User", userSchema);
