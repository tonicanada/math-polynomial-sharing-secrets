const express = require("express");

const polysecretRouter = require("./polysecret/polysecret.router");

const api = express.Router()

api.use("/", polysecretRouter)

module.exports = api
