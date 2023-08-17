const User = require("../models/User");
const { BadRequestError, UnauthenticationError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Invalid Credentials");
  }
  const match = user.comparePassword(password);
  if (!match) {
    throw new UnauthenticationError("Invalid password.");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token });
};
module.exports = { login, register };
