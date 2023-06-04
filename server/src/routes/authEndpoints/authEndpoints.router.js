const express = require("express");
const { passport } = require("./authMiddleware");

const authEndpointsRouter = express.Router();

const checkLoggedIn = (req, res, next) => {
  console.log("Current user is:", req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must log in!",
    });
  }
  next();
};

authEndpointsRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "email"],
  })
);

authEndpointsRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  }),
  (req, res) => {}
);

authEndpointsRouter.get("/failure", (req, res) => {
  return res.send("Failed to log in");
});

authEndpointsRouter.get("/auth/logout", (req, res) => {
  req.logout();
  return res.redirect('/')
});

authEndpointsRouter.get("/get-user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
});

module.exports = authEndpointsRouter;
