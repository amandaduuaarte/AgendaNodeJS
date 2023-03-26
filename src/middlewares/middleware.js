exports.globalMiddleware = (req, res, next) => {
  console.log("global middleware");

  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
  next();
};
