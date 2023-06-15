const express = require("express");

const {
  httpGenerateLagrangeInterpolationFieldReal,
  httpGenerateNewtonInterpolationFieldReal,
  httpGenerateLagrangeInterpolationFieldModP,
  httpGenerateNewtonInterpolationFieldModP,
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

playgroundRouter.post(
  "/plot-poly-newton-mod-p",
  httpGenerateNewtonInterpolationFieldModP
);

module.exports = { playgroundRouter };
