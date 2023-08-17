const User = require("../models/User");
const jwt = require("jsonwebtoken");
const login = (req, res) => {
  res.send("login");
};
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = jwt.sign(
    { username: user.name, userID: user._id },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30d" }
  );
  res.status(201).json({ user, token });
};
module.exports = { login, register };
