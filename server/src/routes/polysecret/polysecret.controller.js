const Polynomial = require("polynomial");
const {
  lagrangeInterpolation,
  generateRandomPolynomial,
  findNextPrime,
} = require("./polysecret.utils");
const secret = require("./secret.json");
const { secretSize } = require("../../../config");
const fs = require("fs");
const {
  generateExcelWithShares,
  checkSecretWithExcelShares,
} = require("./polysecret.excelfunctions.");

const prime = findNextPrime(secret.totalPeople, secretSize);

const httpGetPolySecret = (req, res) => {
  const poly = new Polynomial(secret.polySecret);
  res.send(poly.toString());
  return res.status(200);
};

const httpGenerateSecret = (req, res) => {
  const { totalPeople, requiredPeople } = req.body;

  const poly = generateRandomPolynomial(requiredPeople, 0, prime);
  const polySecret = new Array(requiredPeople).fill(0);

  for (let key in poly.coeff) {
    polySecret[key] = poly.coeff[key];
  }

  const shares = {};
  for (let i = 0; i < totalPeople; i++) {
    shares[i + 1] = poly.eval(i + 1);
  }

  const jsonData = { polySecret, totalPeople, requiredPeople, shares };
  fs.writeFile(
    "./src/routes/polysecret/secret.json",
    JSON.stringify(jsonData),
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving the file");
      } else {
        res.status(200).send("Secret saved successfully");
      }
    }
  );
};

const httpBuildPolySecret = (req, res) => {
  try {
    const data = req.body;
    const points = [];
    for (let key in data) {
      points.push([Number(key), data[key]]);
    }
    const poly = lagrangeInterpolation(points, prime);
    res.status(200).send(poly);
  } catch (error) {
    res.status(500).send("There was an error building the polynomial");
  }
};

const httpClearSecret = (req, res) => {
  const polySecret = [];
  const totalPeople = null;
  const requiredPeople = null;
  const shares = {};
  const jsonData = { polySecret, totalPeople, requiredPeople, shares };
  fs.writeFile("./src/secret.json", JSON.stringify(jsonData), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error clearing secret");
    } else {
      res.status(200).send("Secret cleared successfully");
    }
  });
};

const httpDownloadShares = async (req, res) => {
  try {
    filePath = "./temp/secret-shares.xlsx";
    await generateExcelWithShares(secret, filePath);
    res.download(filePath, (err) => {
      if (err) {
        console.log(err);
        console.error("Error downloading file.");
        res.status(500).send("Error downloading file.");
      } else {
        res.status(200);
      }
    });
  } catch (error) {
    console.error("Error generating Excel with shares.", error);
    res.status(500).send("Error generating Excel with shares");
  }
};

const httpCheckSecret = async (req, res) => {
  try {
    console.log(req.file);
    const check = await checkSecretWithExcelShares(
      secret,
      req.file.path,
      prime
    );

    if (check.decoded) {
      res.status(200).json({
        message: `${check.value}`,
        plotData: check.plotData,
      });
    } else {
      res.status(200).json({
        message: "Secret decryption was not successful",
        plotData: check.plotData,
      });
    }
  } catch (error) {
    console.log(error.message);
    if (error.message === "Wrong header") {
      res.status(500).send(error.message);
    } else if (error.message === "Wrong number of people required") {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }

  if (req.file) {
    fs.unlink(req.file.path, (error) => {
      if (error) {
        console.error("Error deleting file:", error);
      } else {
        console.log("File deleted successfully");
      }
    });
  }
};

const httpGetPublicDataCurrentSecret = async (req, res) => {
  res.send({
    requiredPeople: secret.requiredPeople,
    totalPeople: secret.totalPeople,
  });
};

module.exports = {
  httpGetPolySecret,
  httpGenerateSecret,
  httpBuildPolySecret,
  httpClearSecret,
  httpDownloadShares,
  httpCheckSecret,
  httpGetPublicDataCurrentSecret
};
