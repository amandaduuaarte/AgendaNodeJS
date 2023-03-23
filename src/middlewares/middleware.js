exports.globalMiddleware = (req, res, next) => {
  console.log("Middleware Global");
  next();
};
