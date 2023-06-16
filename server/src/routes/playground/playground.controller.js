const {
  lagrangeInterpolationFieldReal,
  newtonInterpolationFieldReal,
  lagrangeInterpolationFieldModP,
  newtonInterpolationFieldModP,
} = require("../../utils/polynomial.utils");

const genLinspace = (start, end, count) => {
  const step = (end - start) / (count - 1);
  const array = [];

  for (let i = 0; i < count; i++) {
    array.push(start + step * i);
  }

  return array;
};

const genIntArray = (points, p) => {
  const start = points[0][0]%p;
  const end = points[points.length - 1][0]%p;

  const range = end - start + 1;

  const step = range < 100 ? 1 : Math.floor(range / points.length);

  const array = [];

  for (let i = start; i <= end; i += step) {
    array.push(i);
  }
  // Check all points will be included in the space
  if (range > 100) {
    for (point of points) {
      if (!array.includes(point[0] % p)) {
        array.push(point[0] % p);
      }
    }
  }
  array.sort((a, b) => a - b);


  return array;
};

const httpGenerateLagrangeInterpolationFieldReal = (req, res) => {
  const points = req.body.sort((p1, p2) => {
    return p1[0] - p2[0];
  });
  const poly = lagrangeInterpolationFieldReal(points);
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
  const poly = lagrangeInterpolationFieldModP(points, p);
  const linspace = genIntArray(points, p);
  const response = [];
  for (let i = 0; i < linspace.length; i++) {
    response.push([linspace[i], poly.eval(linspace[i])]);
  }
  res.status(200).json({
    polyPoints: response,
    polyString: poly.toString(),
  });
};

const httpGenerateNewtonInterpolationFieldModP = async (req, res) => {
  const points = req.body.pointsArray.sort((p1, p2) => {
    return p1[0] - p2[0];
  });
  const p = Number(req.body.p);
  const poly = newtonInterpolationFieldModP(points, p);
  const linspace = genIntArray(points, p);
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
  httpGenerateNewtonInterpolationFieldModP,
};
