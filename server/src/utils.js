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
const findNextPrime = (num1, num2) => {
  let greaterNumber = Math.max(num1, num2);
  greaterNumber++;

  while (true) {
    if (isPrime(greaterNumber)) {
      return greaterNumber;
    }
    greaterNumber++;
  }
};

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
  console.log("a", a, "b", b)
  if (b === 0) {
    return [a, 1, 0];
  }
  const [gcd, x1, y1] = extendedEuclidean(b, a % b);
  const x = y1;
  const y = x1 - Math.floor(a / b) * y1;
  return [gcd, x, y];
};

extendedEuclidean(2003,20)

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  findNextPrime,
  modDivide,
  getRandomNumber
};
