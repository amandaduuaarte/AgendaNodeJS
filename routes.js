const express = require("express");
const route = express.Router();

const { homeController } = require("./src/controllers/homeController");
const { loginIndexController, loginController, logoutController } = require("./src/controllers/loginController");
const { registerIndexController, registerController } = require("./src/controllers/registerController");
const { contactIndexController, contactController } = require('./src/controllers/contactController');

const { loginRequired } = require('./src/middlewares/middleware')

route.get("/", homeController);

route.get("/login", loginIndexController);
route.get("/register", registerIndexController);
route.get("/login/logout", logoutController);
route.get("/contact", loginRequired, contactIndexController);

route.post("/register", registerController);
route.post("/login", loginController);
route.post("/contact", loginRequired, contactController);



module.exports = route;
