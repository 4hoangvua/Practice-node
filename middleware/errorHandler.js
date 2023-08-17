const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Some thing went wrong, please try again",
  };
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplice value enterd for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  // return res.status(customError.statusCode).json({ error: err });
  return res.status(customError.statusCode).json({ error: customError.msg });
};
module.exports = errorHandlerMiddleware;
