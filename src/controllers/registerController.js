const Register = require("../models/RegisterModel");

const registerController = async (req, res) => {
  register = new Register(req.body);
  await register.register();

  if (register.errors.length > 0) {
    req.flash("Register", register.errors);

    req.session.save(() => {
      return res.redirect("back");
    });
    return;
  }
  res.send(register.registerUser);
};

module.exports = { registerController };
