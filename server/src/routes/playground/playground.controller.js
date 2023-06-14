const {
  lagrangeInterpolationFieldReal,
  newtonInterpolationFieldReal,
  lagrangeInterpolationFieldModP,
} = require("../../utils/polynomial.utils");

const genLinspace = (start, end, count) => {
  const step = (end - start) / (count - 1);
  const array = [];

  for (let i = 0; i < count; i++) {
    array.push(start + step * i);
  }

  return array;
};

const genIntArray = (end) => {
  const array = [];

  for (let i = 0; i <= end; i++) {
    array.push(i);
  }

  return array;
};

const httpGenerateLagrangeInterpolationFieldReal = (req, res) => {
  const points = req.body.sort((p1, p2) => {
    return p1[0] - p2[0];
  });
  const poly = lagrangeInterpolationFieldReal(points);
  console.log(poly);
  const linspace = genLinspace(points[0][0], points[points.length - 1][0], 30);
  const response = [];
  for (let i = 0; i < linspace.length; i++) {
    response.push([linspace[i], poly.eval(linspace[i])]);
  }
  res.status(200).json({
    polyPoints: response,
    polyString: poly.toString(),
  });
};

const httpGenerateNewtonInterpolationFieldReal = async (req, res) => {
  const points = req.body.sort((p1, p2) => {
    return p1[0] - p2[0];
  });
  const poly = newtonInterpolationFieldReal(points);
  const linspace = genLinspace(points[0][0], points[points.length - 1][0], 30);
  const response = [];
  for (let i = 0; i < linspace.length; i++) {
    response.push([linspace[i], poly.eval(linspace[i])]);
  }
  res.status(200).json({
    polyPoints: response,
    polyString: poly.toString(),
  });
};

const httpGenerateLagrangeInterpolationFieldModP = async (req, res) => {
  const points = req.body.pointsArray.sort((p1, p2) => {
    return p1[0] - p2[0];
  });
  const p = Number(req.body.p);
  console.log(p);
  const poly = lagrangeInterpolationFieldModP(points, p);
  const linspace = genIntArray(points[points.length - 1][0]);
  const response = [];
  for (let i = 0; i < linspace.length; i++) {
    response.push([linspace[i], poly.eval(linspace[i])]);
  }
  res.status(200).json({
    polyPoints: response,
    polyString: poly.toString(),
  });
};

module.exports = {
  httpGenerateLagrangeInterpolationFieldReal,
  httpGenerateNewtonInterpolationFieldReal,
  httpGenerateLagrangeInterpolationFieldModP,
};
