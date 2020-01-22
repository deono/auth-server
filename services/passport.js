const passport = require("passport");
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Setup option for local strategy
const localOptions = {
  usernameField: "email",
  passwordField: "password",
  session: false
};
// Create Local Strategy
const LocalLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  // verify the username and passpord,
  // call done() with the user if correct.
  // otherwise call done() with false
  User.findOne({ email: email }, function(err, user) {
    // database error
    if (err) {
      return done(err);
    }
    // user was not found
    if (!user) {
      return done(null, false);
    }

    // compare passwords
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.JWT_SECRET
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// tell Passport to use this strategy
passport.use(jwtLogin);
