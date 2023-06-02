const request = require("supertest");
const app = require("../../app");
const { lagrangeInterpolation, findNextPrime } = require("./polysecret.utils");
const secret = require("./secret.json");
const { secretSize } = require("../../../config");
const fs = require("fs");
const {
  httpGenerateSecret,
  httpClearSecret,
  httpDownloadShares,
} = require("./polysecret.controller");

const { generateExcelWithShares } = require("./polysecret.excelfunctions.");

const prime = findNextPrime(secret.totalPeople, secretSize);

describe("Test POST /build-secret-poly", () => {
  const points = {
    1: 22327234,
    2: 6744719,
    3: 2416793,
    4: 14460185,
    5: 15016247,
    6: 13156895,
    7: 22801026,
    8: 5351671,
    9: 21381150,
    10: 21619679,
  };

  test("It should return the correct polynomial", async () => {
    const response = await request(app).post("/build-secret-poly").send(points);
    expect(response.statusCode).toBe(200);

    const polynomialReturned = response.body;
    pointsArray = [];
    for (let key in points) {
      pointsArray.push([Number(key), points[key]]);
    }
    const polynomialExpected = lagrangeInterpolation(pointsArray, prime);
    expect(polynomialExpected).toEqual(polynomialReturned);
  });
});

describe("Test POST /generate-secret", () => {
  test("It should save the secret and return a success message", async () => {
    const req = {
      body: {
        totalPeople: 10,
        requiredPeople: 5,
      },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    fs.writeFile = jest.fn((path, data, callback) => {
      // Simulate the behavior of fs.writeFile
      // You can perform additional checks here if needed
      callback(null);
    });

    await httpGenerateSecret(req, res);

    // Verify that fs.writeFile was called with the correct arguments
    expect(fs.writeFile).toHaveBeenCalledWith(
      "./src/routes/polysecret/secret.json",
      expect.any(String),
      expect.any(Function)
    );

    // Verify that res.send was called with the success message
    expect(res.send).toHaveBeenCalledWith("Secret saved successfully");

    // Verify that res.status called with 200 status
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("Test POST /clear-secret", () => {
  test("It should clear the secret and return a success message", async () => {
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    fs.writeFile = jest.fn((path, data, callback) => {
      // Simulate the behavior of fs.writeFile
      // You can perform additional checks here if needed
      callback(null);
    });

    await httpClearSecret({}, res);

    // Verify that fs.writeFile was called with the correct arguments
    expect(fs.writeFile).toHaveBeenCalledWith(
      "./src/secret.json",
      expect.any(String),
      expect.any(Function)
    );

    // Verify that res.send was called with the success message
    expect(res.send).toHaveBeenCalledWith("Secret cleared successfully");

    // Verify that status is 200
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
