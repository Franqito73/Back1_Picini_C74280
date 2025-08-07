const passport = require('passport');

const passportCall = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info?.message || 'No autorizado: usuario no logueado' });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

module.exports = passportCall;
