const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const secret = require("./routes/polysecret/secret.json");
const cors = require("cors");
const { secretSize } = require("../config");

const api = require("./routes/api");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
