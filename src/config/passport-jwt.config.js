const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserModel = require('../dao/models/user.model');

const SECRET_KEY = 'jwtSecretFranco123'; 

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

passport.use(
  'jwt',
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await UserModel.findById(jwt_payload.id).select('-password'); // no enviar contraseña
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
