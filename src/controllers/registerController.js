const { Register } = require("../models/RegisterModel");

const registerIndexController = async (req, res) => {
  res.render("singup");
};

const registerController = async (req, res) => {
  try {
    const register = new Register(req.body);
    await register.register();

    if (register.errors.length > 0) {
      req.flash("errors", register.errors);
      req.session.save(function () {
        return res.redirect("back");
      });
      return;
    }

    req.flash("success", register.success);
    req.session.user = register.registerUser;
    req.session.save(function () {
      return res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

module.exports = { registerIndexController, registerController };
