exports.globalMiddleware = (req, res, next) => {

  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
  res.locals.contacts = req.session.contacts;
  next();
};


exports.loginRequired = (req, res, next) => { 
  if (!req.session.user) {
    req.flash('erros', "Usuario não logado");
    req.session.save(() => res.redirect('/login'));

    return;
  }
  next();
}