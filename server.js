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

app.use(express.urlencoded({ extended: true }));

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const routes = require("./routes");
const path = require("path");

app.use(express.json());

const { globalMiddleware } = require("./src/middlewares/middleware");

const sessionOptions = session({
  secret: "sjgfgjrthrtrtrtwfsdfsc",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.use(globalMiddleware);

app.use(routes);
app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.on("ready", () => {
  app.listen(3030, () => {
    console.log("listening on port 3030");
  });
});
