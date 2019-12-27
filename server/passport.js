const passport = require("passport");
const passportJWT = require("passport-jwt");
const helpers = require("./helpers");

module.exports = function(app) {
  // ExtractJwt to help extract the token
  const ExtractJwt = passportJWT.ExtractJwt;
  // JwtStrategy which is the strategy for the authentication
  const JwtStrategy = passportJWT.Strategy;
  const jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = process.env.JWT_SECRET;

  // lets create our strategy for web token
  let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, done) {
    let user =  await helpers.getUser({ id: jwt_payload.id });
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });

  // use the strategy
  passport.use(strategy);
  app.use(passport.initialize());
};
