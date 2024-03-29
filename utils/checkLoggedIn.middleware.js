module.exports = async (req, res, next) => {
  if (!req.userId) {
    let err = new Error("You must log in to do this!");
    err.status = 403;
    return next(err);
  } else {
    next();
  }
};
