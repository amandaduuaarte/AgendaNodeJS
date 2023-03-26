const express = require("express");
const route = express.Router();

const { homeController } = require("./src/controllers/homeController");
const { loginIndexController, loginController, logoutController } = require("./src/controllers/loginController");
const { registerIndexController, registerController } = require("./src/controllers/registerController");

route.get("/", homeController);

route.get("/login", loginIndexController);
route.get("/register", registerIndexController);

route.post("/register", registerController);
route.post("/login", loginController);
route.get("/login/logout", logoutController);

module.exports = route;
