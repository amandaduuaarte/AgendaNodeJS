require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const csrf = require("csurf");
const helmet = require("helmet");
const path = require("path");
const {
  globalMiddleware,
  checkCsrfErrors,
  checkCsrfMiddleware,
} = require("./src/middlewares/middleware");

// Configuração do MongoDB
mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3030, () => {
      console.log("Listening on port 3030");
    });
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const sessionOptions = session({
  secret: "sjgfgjrthrtrtrtwfsdfsc",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf());
app.use(helmet());

app.use(globalMiddleware);
app.use(checkCsrfErrors);
app.use(checkCsrfMiddleware);

const routes = require("./routes");
app.use(routes);
