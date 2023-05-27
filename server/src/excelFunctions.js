const writeXlsxFile = require("write-excel-file/node");
const readXlsxFile = require("read-excel-file/node");
const { lagrangeInterpolation } = require("./polyFunctions");
const { secretSize } = require("../config");
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

  const buffer = await writeXlsxFile(data, {
    filePath: "./temp/secret-shares.xlsx",
  });
}

async function checkSecretWithExcelShares(secret, filePath, p) {
  try {
    const rows = await readXlsxFile(fs.createReadStream(filePath));

    if (rows[0][0] !== "Person Id" || rows[0][1] !== "Share Value") {
      throw new Error("Wrong header");
    } else if (rows.length !== secret.requiredPeople + 1) {
      throw new Error("Wrong number of people required");
    }

    const points = rows.filter((_, i) => i !== 0);
    const poly = lagrangeInterpolation(points, p);

    if (poly.coeff["0"] === secret.polySecret[0]) {
      console.log("BUENA!!! Descrifrado!!!");

      return {
        decoded: true,
        value: poly.coeff["0"],
      };
    } else {
      return {
        decoded: false,
        value: undefined,
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
