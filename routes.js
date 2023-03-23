const express = require("express");
const router = express.Router();

const { homeController } = require("./src/controllers/homeController");
const { secondController } = require("./src/controllers/secondController");

router.get("/", homeController);

router.get("/second/:id?", secondController);

module.exports = router;
