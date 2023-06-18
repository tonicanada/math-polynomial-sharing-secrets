const { Polynomial } = require("./poly");
const { secretSize } = require("../../config");

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

const modDivide = (numerator, denominator, p) => {
  const denominatorModP = ((denominator % p) + p) % p;
  const inverse = modInverse(denominatorModP, p);
  const result = (numerator * inverse) % p;
  return (result + p) % p;
};

const modInverse = (num, p) => {
  const [gcd, x, y] = extendedEuclidean(num, p);
  if (gcd !== 1n) {
    throw new Error("The multiplicative inverse does not exist in modulo p.");
  }
  const result = ((x % p) + p) % p;
  return result;
};

const extendedEuclidean = (a, b) => {
  if (b === 0n) {
    return [a, 1n, 0n];
  }
  const [gcd, x1, y1] = extendedEuclidean(b, a % b);
  const x = y1;
  const y = x1 - ((a / b) | 0n) * y1;
  return [gcd, x, y];
};

const getRandomNumber = (min, max) => {
  const randomNumber = BigInt(
    Math.floor(Math.random() * (max - min + 1)) + min
  );
  return randomNumber;
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
const lagrangeInterpolationFieldModP = (points, prime) => {
  points = points.map((point) => [BigInt(point[0]), BigInt(point[1])]);
  prime = BigInt(prime);

  let baseSum = new Polynomial([0n], "bigint");

  for (let i = 0; i < points.length; i++) {
    let baseProd = new Polynomial([1n], "bigint");

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        let term = new Polynomial([-points[j][0] % prime, 1n], "bigint");
        term = term.mul(
          new Polynomial(
            [
              modDivide(
                1n,
                ((points[i][0] % prime) - (points[j][0] % prime)) % prime,
                BigInt(prime)
              ),
            ],
            "bigint"
          )
        );
        term = term.mod(prime);
        baseProd = baseProd.mul(term);
        baseProd = baseProd.mod(prime);
      }
    }
    baseSum = baseSum.add(
      baseProd.mul(new Polynomial([points[i][1] % prime], "bigint")).mod(prime)
    );
    baseSum = baseSum.mod(prime);
  }

  return baseSum;
};

const lagrangeInterpolationFieldReal = (points) => {
  let baseSum = new Polynomial([0], "float");

  for (let i = 0; i < points.length; i++) {
    let baseProd = new Polynomial([1], "float");

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        let term = new Polynomial([-points[j][0], 1], "float");
        term = term.mul(
          new Polynomial([1 / (points[i][0] - points[j][0])], "float")
        );
        baseProd = baseProd.mul(term);
      }
    }
    baseSum = baseSum.add(
      baseProd.mul(new Polynomial([points[i][1]], "float"))
    );
  }

  return baseSum;
};

const newtonInterpolationFieldReal = (points) => {
  const n = points.length;
  const a = new Array(n);

  const getPkNewton = (k, memo) => {
    // Base case
    if (k === 0) {
      return new Polynomial([points[0][1]], "float");
    }

    // Check if result is in memo
    if (memo[k]) {
      return memo[k];
    }
    let c = 1;
    let p = new Polynomial([1], "float");
    for (let i = 0; i < k; i++) {
      c *= points[k][0] - points[i][0];
      p = p.mul(new Polynomial([-points[i][0], 1], "float"));
    }
    let res = getPkNewton(k - 1, memo).add(
      new Polynomial(
        [
          (points[k][1] - getPkNewton(k - 1, memo).eval(points[k][0])) *
            (1 / c),
        ],
        "float"
      ).mul(p)
    );
    memo[k] = res;
    return res;
  };

  return getPkNewton(n - 1, a);
};

const newtonInterpolationFieldModP = (points, prime) => {
  points = points.map((point) => [BigInt(point[0]), BigInt(point[1])]);
  prime = BigInt(prime);

  const n = points.length;
  const a = new Array(n);

  const getPkNewton = (k, memo) => {
    // Base case
    if (k === 0) {
      return new Polynomial([points[0][1] % prime], "bigint");
    }

    // Check if result is in memo
    if (memo[k]) {
      return memo[k];
    }
    let c = 1n;
    let p = new Polynomial([1n], "bigint");
    for (let i = 0; i < k; i++) {
      c *= ((points[k][0] % prime) - (points[i][0] % prime)) % prime;

      p = p.mul(new Polynomial([-points[i][0] % prime, 1n], "bigint"));
    }
    let res = getPkNewton(k - 1, memo).add(
      new Polynomial(
        [
          ((points[k][1] % prime) -
            (getPkNewton(k - 1, memo).eval(points[k][0] % prime) % prime)) *
            modDivide(1n, c, prime),
        ],
        "bigint"
      ).mul(p)
    );
    memo[k] = res;
    return res;
  };

  return getPkNewton(n - 1, a).mod(prime);
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

const genIntArray = (points, p, start, end) => {
  points = points.map((point) => [BigInt(point[0]), BigInt(point[1])]);
  p = BigInt(p);

  const range = end - start + 1n;

  const step =
    range <= 100n ? 1n : BigInt(Math.floor(Number(range) / points.length));

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
  array.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });

  return array;
};

const genLinspace = (start, end, count) => {
  const step = (end - start) / (count - 1);
  const array = [];

  for (let i = 0; i < count; i++) {
    array.push(start + step * i);
  }

  return array;
};

module.exports = {
  lagrangeInterpolationFieldReal,
  newtonInterpolationFieldReal,
  lagrangeInterpolationFieldModP,
  newtonInterpolationFieldModP,
  generateRandomPolynomial,
  findNextPrime,
  modDivide,
  getRandomNumber,
  genIntArray,
  genLinspace,
};
