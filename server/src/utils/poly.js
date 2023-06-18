function strip(L, elt) {
  if (L.length === 0) {
    return L;
  }

  let i = L.length - 1;
  while (i >= 0 && L[i] === elt) {
    i -= 1;
  }

  return L.slice(0, i + 1);
}

class Poly {
  constructor(coefficients, dataType = "bigint") {
    if (dataType !== "bigint" && dataType !== "float") {
      throw new Error("Invalid data type specified");
    }
    this.coefficients =
      dataType === "bigint" ? strip(coefficients, 0n) : coefficients;
    this.indeterminate = "x";
    this.zero = dataType === "bigint" ? 0n : 0;
    this.one = dataType === "bigint" ? 1n : 1;
    this.dataType = dataType;
  }

  add(other) {
    const maxLength = Math.max(
      this.coefficients.length,
      other.coefficients.length
    );
    const newCoefficients = [];

    for (let i = 0; i < maxLength; i++) {
      const coeff1 = this.coefficients[i] || this.zero;
      const coeff2 = other.coefficients[i] || this.zero;
      const sum = coeff1 + coeff2;
      newCoefficients.push(sum);
    }

    return new Poly(newCoefficients, this.dataType);
  }

  mul(other) {
    const newCoefficients = Array(
      this.coefficients.length + other.coefficients.length - 1
    ).fill(this.zero);

    for (let i = 0; i < this.coefficients.length; i++) {
      for (let j = 0; j < other.coefficients.length; j++) {
        newCoefficients[i + j] += this.coefficients[i] * other.coefficients[j];
      }
    }

    return new Poly(strip(newCoefficients, this.zero), this.dataType);
  }

  power(exponent) {
    let base = new Poly([this.one], this.dataType);
    for (let i = 0; i < exponent; i++) {
      base = base.mul(this);
    }
    return base;
  }

  eval(x) {
    let sum = this.zero;

    for (let i = this.coefficients.length - 1; i >= 0; i--) {
      sum = sum * x + this.coefficients[i];
    }

    return sum;
  }

  mod(p) {
    const newCoefficients = this.coefficients.map((a) =>
      a >= 0 ? a % p : (a % p) + p
    );
    return new Poly(newCoefficients, this.dataType);
  }

  get length() {
    return this.coefficients.length;
  }

  toString() {
    let result = this.coefficients
      .map((a, i) => (i > 0 ? `${a} ${this.indeterminate}^${i}` : `${a}`))
      .join(" + ");
    result = result.replace(/\+ -/g, "-");
    result = result.replace("x^1", "x")
    return result;
  }
}

module.exports = {
  Polynomial: Poly,
};
