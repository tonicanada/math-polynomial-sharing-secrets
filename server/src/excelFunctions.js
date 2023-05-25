const writeXlsxFile = require("write-excel-file/node");

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
    filePath: "./temp/shares.xlsx",
  });
}

module.exports = {
  generateExcelWithShares,
};
