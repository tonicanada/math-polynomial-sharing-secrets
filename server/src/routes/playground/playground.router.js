const express = require("express");

const {
  httpGenerateLagrangeInterpolationFieldReal,
  httpGenerateNewtonInterpolationFieldReal,
  httpGenerateLagrangeInterpolationFieldModP
} = require("./playground.controller");

const playgroundRouter = express.Router();

playgroundRouter.post(
  "/plot-poly-lagrange-real",
  httpGenerateLagrangeInterpolationFieldReal
);

playgroundRouter.post(
  "/plot-poly-newton-real",
  httpGenerateNewtonInterpolationFieldReal
);

playgroundRouter.post(
  "/plot-poly-lagrange-mod-p",
  httpGenerateLagrangeInterpolationFieldModP
);

module.exports = { playgroundRouter };
