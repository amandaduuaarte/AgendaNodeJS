const Login = require('../models/LoginModel');

const loginIndexController = (req, res) => {
  if (req.session.user) return res.redirect('/');
  return res.render('login');
};
const loginController = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.logar();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);

      req.session.save(() => {
        return res.redirect('/login');
      });
      return;
    }

    req.flash('success', login.success);
    req.session.user = login.user;

    req.session.save(function () {
      return res.redirect('/');
    });
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
};

const logoutController = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
};

module.exports = { loginIndexController, loginController, logoutController };
