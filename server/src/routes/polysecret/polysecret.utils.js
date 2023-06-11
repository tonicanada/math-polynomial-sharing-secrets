const Polynomial = require("polynomial");
const { secretSize } = require("../../../config");

// Function that checks if a number is prime
const isPrime = (number) => {
  if (number < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
};

// Function that returns the next prime number greater than the maximum
// of two given numbers.
const findNextPrime = (num) => {
  if (isPrime(num)) {
    return num;
  } else {
    let next = num + 1;
    while (true) {
      if (isPrime(next)) {
        return next;
      }
      next++;
    }
  }
};

Polynomial.setField(`Z${findNextPrime(secretSize)}`);

const modDivide = (numerator, denominator, p) => {
  const denominatorModP = ((denominator % p) + p) % p; // Asegura que el denominador esté en el rango [0, p-1]
  const inverse = modInverse(denominatorModP, p); // Calcula el inverso multiplicativo del denominador en módulo p
  const result = (numerator * inverse) % p; // Realiza la división y aplica el módulo p al resultado
  return (result + p) % p; // Asegura que el resultado sea positivo en caso de ser negativo
};

const modInverse = (num, p) => {
  const [gcd, x, y] = extendedEuclidean(num, p);
  if (gcd !== 1) {
    throw new Error("No existe el inverso multiplicativo en módulo p");
  }
  const result = ((x % p) + p) % p; // Asegura que el resultado sea positivo en caso de ser negativo
  return result;
};

const extendedEuclidean = (a, b) => {
  // console.log("a", a, "b", b)
  if (b === 0) {
    return [a, 1, 0];
  }
  const [gcd, x1, y1] = extendedEuclidean(b, a % b);
  const x = y1;
  const y = x1 - Math.floor(a / b) * y1;
  return [gcd, x, y];
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
        const term = new Polynomial([-points[j][0], 1]).mul(
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
    coefArray[i] = getRandomNumber(min, max);
  }
  const poly = new Polynomial(coefArray);

  return poly;
};

module.exports = {
  lagrangeInterpolation,
  generateRandomPolynomial,
  findNextPrime,
  modDivide,
  getRandomNumber,
};
