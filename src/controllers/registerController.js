const Register = require("../models/RegisterModel");

const registerController = async (req, res) => {
  register = new Register(req.body);
  await register.register();

  res.send(register.registerUser);
};

module.exports = { registerController };
