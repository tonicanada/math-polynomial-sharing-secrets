const {
  lagrangeInterpolationFieldReal,
  newtonInterpolationFieldReal,
  lagrangeInterpolationFieldModP,
  newtonInterpolationFieldModP,
  genIntArray,
  genLinspace
} = require("../../utils/polynomial.utils");


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
  const p = BigInt(req.body.p);
  const poly = lagrangeInterpolationFieldModP(points, p);
  const linspace = genIntArray(
    points,
    p,
    BigInt(points[0][0]) % p,
    BigInt(points[points.length - 1][0]) % p
  );
  const response = [];
  for (let i = 0; i < linspace.length; i++) {
    let eval = poly.eval(BigInt(linspace[i])) % p;
    eval = eval >= 0 ? eval : (eval % p) + p;
    response.push([BigInt(linspace[i]).toString(), eval.toString()]);
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
  const p = BigInt(req.body.p);
  const poly = newtonInterpolationFieldModP(points, p);
  const linspace = genIntArray(
    points,
    p,
    BigInt(points[0][0]) % p,
    BigInt(points[points.length - 1][0]) % p
  );
  const response = [];
  for (let i = 0; i < linspace.length; i++) {
    let eval = poly.eval(BigInt(linspace[i])) % p;
    eval = eval >= 0 ? eval : (eval % p) + p;
    response.push([BigInt(linspace[i]).toString(), eval.toString()]);
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
