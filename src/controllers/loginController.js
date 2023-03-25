const Login = require('../models/LoginModel');

const loginIndexController = (req, res) => {
  res.render("login");
}
const loginController = async (req, res) => {
 
  try {
    login = new Login(req.body);
    await login.logar();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);

      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }

    req.flash("success", login.success);
    //Creat user session
    req.session.user = login.user;

    req.session.save(() => {
      return res.redirect("/");
    });

  } catch (error) {
    console.log(error);
    return res.render("404");
  }

};

module.exports = { loginIndexController, loginController };
