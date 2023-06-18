const writeXlsxFile = require("write-excel-file/node");
const readXlsxFile = require("read-excel-file/node");
const {
  lagrangeInterpolationFieldModP,
  genIntArray,
} = require("../../utils/polynomial.utils");
const fs = require("fs");

async function generateExcelWithShares(secret) {
  const headeRow = [
    {
      value: "Person Id",
      fontWeight: "bold",
    },
    {
      value: "Share Value",
      fontWeight: "bold",
    },
  ];

  const contentRows = [];

  for (share in secret.shares) {
    contentRows.push([
      {
        type: Number,
        value: Number(share),
      },
      {
        type: Number,
        value: secret.shares[share],
      },
    ]);
  }

  const data = [headeRow, ...contentRows];
  const buffer = await writeXlsxFile(data, { buffer: true });

  return buffer;
}

async function checkSecretWithExcelShares(secret, filePath, p) {
  try {
    const rows = await readXlsxFile(fs.createReadStream(filePath));

    if (rows[0][0] !== "Person Id" || rows[0][1] !== "Share Value") {
      throw new Error("Wrong header");
    } else if (rows.length !== secret.requiredPeople + 1) {
      throw new Error("Wrong number of people required");
    }

    let points = rows.filter((_, i) => i !== 0); // Drops header row
    const poly = lagrangeInterpolationFieldModP(points, p);
    const plotData = [];

    if (poly.coefficients[0] === BigInt(secret.polySecret[0])) {
      console.log("GOOD!!! Unlocked!!!");
      points.unshift([0, Number(poly.coefficients[0])]);

      let linspace = genIntArray(points, p, 0n, BigInt(secret.totalPeople));

      linspace = linspace.map((p) => Number(p));

      plotData.push({
        x: 0,
        y: Number(poly.coefficients[0])
      })
      
      for (let i = 1; i < linspace.length; i++) {
        plotData.push({
          x: linspace[i],
          y: secret.shares[linspace[i].toString()],
        });
      }

      return {
        decoded: true,
        value: poly.coefficients[0],
        plotData,
        points,
      };
    } else {
      return {
        decoded: false,
        value: undefined,
        plotData,
        points,
      };
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  generateExcelWithShares,
  checkSecretWithExcelShares,
};
