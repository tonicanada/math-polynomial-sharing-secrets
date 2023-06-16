const passport = require("passport");
const User = require("../../models/users.mongo");
const Secret = require("../../models/secrets.mongo");
const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
require("dotenv").config();

const config = {
  CLIENT_ID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile", profile);

  let newUser;

  // Check if the user already exists in MongoDB
  User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        return done(null, existingUser);
      }

      // Create a new user if it doesn't exist
      newUser = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        photoUrl: profile.photos[0].value
      });

      // Save the new user to MongoDB
      return newUser.save();
    })
    .then((savedUser) => {
      // Check if a secret already exists for the new user
      return Secret.findOne({ userId: savedUser._id });
    })
    .then((existingSecret) => {
      if (existingSecret) {
        // A secret already exists for the user
        return done(null, newUser);
      }

      // Create an empty secret for the new user
      const newSecret = new Secret({
        userId: newUser._id, // Associate the secret with the new user
        polySecret: [],
        totalPeople: null,
        requiredPeople: null,
        shares: {}, // Leave the secret empty for now
        isDownloaded: false
      });

      // Save the secret to MongoDB
      return newSecret.save().then(() => {
        return done(null, newUser);
      });
    })
    .catch((err) => {
      return done(err);
    });
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to cookie
passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

// Read the session from the cookie
passport.deserializeUser(async function (req, id, done) {
  const googleId = req.session.passport.user;

  try {
    const user = await User.findOne({ googleId });

    console.log(user);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

const sessionMiddleware = cookieSession({
  name: "session",
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
});

module.exports = { passport, sessionMiddleware };
