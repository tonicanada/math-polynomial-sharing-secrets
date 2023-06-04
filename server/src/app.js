const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const api = require("./routes/api");
const {
  passport,
} = require("./routes/authEndpoints/authMiddleware");

require("dotenv").config();

const config = {
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
    secure: false,
    httpOnly: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;