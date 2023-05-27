const express = require("express");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const secret = require("./secret.json");
const cors = require("cors");
const { serverPort, secretSize } = require("../config");

const Polynomial = require("polynomial");
const { findNextPrime } = require("./utils");
const {
  generateRandomPolynomial,
  lagrangeInterpolation,
} = require("./polyFunctions");

const {
  generateExcelWithShares,
  checkSecretWithExcelShares,
} = require("./excelFunctions");

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: "./temp/", // Carpeta donde se guardarán los archivos
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nombre del archivo guardado en el servidor
  },
});

const upload = multer({ storage });

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const port = serverPort;

const prime = findNextPrime(secret.totalPeople, secretSize);

// Route that reads the secret polynomial stored in secret.json
// and returns it as string (an*x^n + an-1*x^n-1 + ... +a0)
app.get("/get-poly", (req, res) => {
  const poly = new Polynomial(secret.polySecret);
  res.send(poly.toString());
});

// Route that generates a secret polynomial given the total people (totalPeople)
// and the people required to rebuild it (requiredPeople). Data is stored
// in secret.json file.
app.post("/generate-secret", (req, res) => {
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
  fs.writeFile("./src/secret.json", JSON.stringify(jsonData), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving the file");
    } else {
      res.send("Secret saved successfully");
    }
  });
});

// Route that performs Lagrange interpolation given a set of points (shares)
// and returns the resultant polynomial. Request Body example:
// {
//   "2": 26047206,
//   "3": 21448330,
//   "10": 9599346,
//   ...
//   "21": 6954996
// }
app.post("/build-secret-poly", (req, res) => {
  const data = req.body;
  const points = [];
  for (let key in data) {
    points.push([Number(key), data[key]]);
  }
  const poly = lagrangeInterpolation(points, prime);
  res.send(poly);
});

app.get("/download-shares", async (req, res) => {
  try {
    await generateExcelWithShares(secret);
    filePath = "./temp/secret-shares.xlsx";
    res.download(filePath, (err) => {
      if (err) {
        console.log(err);
        console.error("Error downloading file.");
        res.status(500).send("Error downloading file.");
      }
    });
  } catch (error) {
    console.error("Error generating Excel with shares.");
    res.status(500).send("Error generating Excel with shares");
  }
});

app.post("/check-secret", upload.single("file"), async (req, res) => {
  // Aquí puedes acceder al archivo subido a través de req.file
  try {
    console.log(req.file);
    const check = await checkSecretWithExcelShares(
      secret,
      req.file.path,
      prime
    );

    if (check.decoded) {
      res.status(200).json({
        message: `Secret decoded successfully!!!\n Secret value is ${check.value}`,
      });
    } else {
      res.status(200).json({
        message: "Secret decryption was not successful",
      });
    }
  } catch (error) {
    console.log(error, "JJJJ")
    console.log(error.message);
    if (error.message === "Wrong header") {
      res.status(500).send(error.message);
    } else if (error.message === "Wrong number of people required") {
      res.status(500).send(error.message);
    }
  }

  fs.unlink(req.file.path, (error) => {
    if (error) {
      console.error("Error deleting file:", error);
    } else {
      console.log("File deleted successfully");
    }
  });
});

// Starts the server
app.listen(port, () => {
  console.log(`Express Server listening on port ${port}...`);
});

// app.get('download-shares')
