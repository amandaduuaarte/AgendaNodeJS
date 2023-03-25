const express = require("express");
const route = express.Router();

const { homeController } = require("./src/controllers/homeController");
const { loginController } = require("./src/controllers/loginController");
const { registerController } = require("./src/controllers/registerController");

route.get("/", homeController);

route.get("/login", loginController);

route.post("/register", registerController);

module.exports = route;
