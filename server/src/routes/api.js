const express = require("express");

const { polysecretRouter } = require("./polysecret/polysecret.router");
const { authEndpointsRouter } = require("./authEndpoints/authEndpoints.router");

const api = express.Router();

api.use("/", polysecretRouter);
api.use("/", authEndpointsRouter);

module.exports = api;
