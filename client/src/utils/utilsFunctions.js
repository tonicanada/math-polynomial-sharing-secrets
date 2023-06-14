export const calculateNextPrime = (value) => {
  const num = parseInt(value);

  // Función auxiliar para verificar si un número es primo
  const isPrime = (n) => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    let i = 5;
    while (i * i <= n) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
      i += 6;
    }

    return true;
  };

  if (isPrime(num)) {
    return num;
  }

  let nextPrime = num + 1;
  while (!isPrime(nextPrime)) {
    nextPrime++;
  }

  return nextPrime;
};
