require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.emit("ready");
  });

const routes = require("./routes");
const path = require("path");

const { globalMiddleware } = require("./src/middlewares/middleware");

app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(globalMiddleware);

app.on("ready", () => {
  app.listen(3030, () => {
    console.log("listening on port 3030");
  });
});
