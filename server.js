require("dotenv").config();
require("express-async-errors");
const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./database/connect");
const PORT = process.env.PORT || 3000;
const authRouter = require("./routes/api/auth");

app.use(express.json());
// middleware

const errorHandlerMiddleware = require("./middleware/errorHandler");
app.get("/", (req, res) => {
  res.json({ msg: "4hoangvua 1" });
});
app.use("/api/auth", authRouter);
app.use(errorHandlerMiddleware);
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "not-found.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not Found" });
  } else {
    res.type("txt").send("404 not Found");
  }
});
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server listening Port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
