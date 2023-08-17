const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.createJWT = function () {
  return jwt.sign(
    { username: user.name, userID: user._id },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30d" }
  );
};
userSchema.methods.comparePassword = async function (candidatePassword) {
  return (math = bcrypt.compare(candidatePassword, this.password));
};
module.exports = mongoose.model("User", userSchema);
