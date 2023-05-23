const Polynomial = require("polynomial");
const { secretSize } = require("../config");
const { totalPeople } = require("./secret.json");
const { findNextPrime, modDivide, getRandomNumber } = require("./utils");

Polynomial.setField(`Z${findNextPrime(totalPeople, secretSize)}`);

// Function that performs Lagrange interpolation using modular
// arithmetic given an array of points and the prime number
// of the field. Input example:
// points = [
//   [2, 2920356],
//   [4, 16933677],
//   [7, 30011272],
//   ...
//   [33, 5969703]
// ]
// prime = 33554467
const lagrangeInterpolation = (points, p) => {
  let baseSum = new Polynomial([0]);

  for (let i = 0; i < points.length; i++) {
    let baseProd = new Polynomial([1]);

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const term = new Polynomial([-points[j][0], 1], p).mul(
          modDivide(1, points[i][0] - points[j][0], p)
        );
        baseProd = baseProd.mul(term);
      }
    }
    baseSum = baseSum.add(baseProd.mul(points[i][1]));
  }

  return baseSum;
};

// Function that generates a random polynomial where all coefficients
// are 0 except the first and the last one (an*x^n + a0)
const generateRandomPolynomial = (degree, min, max) => {
  const coefArray = new Array(degree).fill(0);
  for (let i = 0; i < degree; i++) {
    if (i === 0 || i === degree - 1) {
      coefArray[i] = getRandomNumber(min, max);
    }
  }
  const poly = new Polynomial(coefArray);

  return poly;
};

module.exports = {
  lagrangeInterpolation,
  generateRandomPolynomial,
};
