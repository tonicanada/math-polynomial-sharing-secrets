const express = require("express");

const { polysecretRouter } = require("./polysecret/polysecret.router");
const { authEndpointsRouter } = require("./authEndpoints/authEndpoints.router");
const { playgroundRouter } = require("./playground/playground.router");

const api = express.Router();

api.use("/", polysecretRouter);
api.use("/", authEndpointsRouter);
api.use("/", playgroundRouter);


module.exports = api;
