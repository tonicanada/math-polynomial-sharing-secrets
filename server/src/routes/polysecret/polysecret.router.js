const express = require("express");
const {
  httpGetPolySecret,
  httpGenerateSecret,
  httpBuildPolySecret,
  httpClearSecret,
  httpDownloadShares,
  httpCheckSecret,
  httpGetPublicDataCurrentSecret
} = require("./polysecret.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./temp/", // Carpeta donde se guardarán los archivos
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nombre del archivo guardado en el servidor
  },
});

const upload = multer({ storage });

const polysecretRouter = express.Router();

// Route that reads the secret polynomial stored in secret.json
// and returns it as string (an*x^n + an-1*x^n-1 + ... +a0)
polysecretRouter.get("/get-poly", httpGetPolySecret);

// Route that generates a secret polynomial given the total people (totalPeople)
// and the people required to rebuild it (requiredPeople). Data is stored in secret.json file.
polysecretRouter.post("/generate-secret", httpGenerateSecret);

// Route that performs Lagrange interpolation given a set of points (shares)
// and returns the resultant polynomial. Request Body example:
// {
//   "2": 26047206,
//   "3": 21448330,
//   "10": 9599346,
//   ...
//   "21": 6954996
// }
polysecretRouter.post("/build-secret-poly", httpBuildPolySecret);

polysecretRouter.post("/clear-secret", httpClearSecret);

polysecretRouter.get("/download-shares", httpDownloadShares);

polysecretRouter.post("/check-secret", upload.single("file"), httpCheckSecret);

polysecretRouter.get("/get-public-data-current-secret", httpGetPublicDataCurrentSecret)

module.exports = polysecretRouter;
