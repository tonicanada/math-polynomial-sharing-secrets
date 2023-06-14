import { useState } from "react";
import {
  httpPlotPolyLagrangeFieldReal,
  httpPlotPolyNewtonFieldReal,
  httpPlotPolyLagrangeFieldModP,
  httpPlotPolyNewtonFieldModP,
} from "../requests";

const usePlotData = () => {
  const [points, setPoints] = useState({
    lagrange: [],
    newton: [],
    lagrangeModP: [],
    newtonModP: [],
  });
  const [plotData, setPlotData] = useState({
    lagrange: [],
    newton: [],
    lagrangeModP: [],
    newtonModP: [],
  });
  const [errorMsg, setErrorMsg] = useState({
    lagrange: "",
    newton: "",
    lagrangeModP: "",
    newtonModP: "",
  });
  const [bottomMsg, setBottomMsg] = useState({
    lagrange: "",
    newton: "",
    lagrangeModP: "",
    newtonModP: "",
  });

  const handleSubmitPlotLagrangeFieldReal = async (inputValue) => {
    const regex = /^\[-?\d+,-?\d+\](,\[-?\d+,-?\d+\])*$/;

    if (regex.test(inputValue)) {
      const inputPoints = JSON.parse(`[${inputValue}]`);
      setPoints((prevPoints) => ({
        ...prevPoints,
        lagrange: inputPoints.map((point) => ({ x: point[0], y: point[1] })),
      }));
      const response = await httpPlotPolyLagrangeFieldReal(inputPoints);
      const polyPoints = response.polyPoints.map((p) => {
        return {
          x: p[0],
          y: p[1],
        };
      });
      setPlotData((prevPlotData) => ({
        ...prevPlotData,
        lagrange: polyPoints,
      }));
      setBottomMsg((prevBottomMsg) => ({
        ...prevBottomMsg,
        lagrange: response.polyString,
      }));
    } else {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        lagrange: "Wrong format",
      }));
    }
  };

  const handleSubmitPlotNewtonFieldReal = async (inputValue) => {
    const regex = /^\[-?\d+,-?\d+\](,\[-?\d+,-?\d+\])*$/;

    if (regex.test(inputValue)) {
      const inputPoints = JSON.parse(`[${inputValue}]`);
      setPoints((prevPoints) => ({
        ...prevPoints,
        newton: inputPoints.map((point) => ({ x: point[0], y: point[1] })),
      }));
      const response = await httpPlotPolyNewtonFieldReal(inputPoints);
      const polyPoints = response.polyPoints.map((p) => {
        return {
          x: p[0],
          y: p[1],
        };
      });
      setPlotData((prevPlotData) => ({
        ...prevPlotData,
        newton: polyPoints,
      }));
      setBottomMsg((prevBottomMsg) => ({
        ...prevBottomMsg,
        newton: response.polyString,
      }));
    } else {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        newton: "Wrong format",
      }));
    }
  };

  const handleSubmitPlotLagrangeFieldModP = async (
    inputValue,
    p,
    setErrorPrime
  ) => {
    const regex = /^\[-?\d+,-?\d+\](,\[-?\d+,-?\d+\])*$/;

    console.log(p);

    if (!p) {
      setErrorPrime(
        "Please enter a number greater than 1.000 to compute the next prime"
      );
    } else {
      if (regex.test(inputValue)) {
        const inputPoints = JSON.parse(`[${inputValue}]`);
        setPoints((prevPoints) => ({
          ...prevPoints,
          lagrangeModP: inputPoints.map((point) => ({
            x: point[0] % p,
            y: point[1] % p,
          })),
        }));
        const response = await httpPlotPolyLagrangeFieldModP(inputPoints, p);
        const polyPoints = response.polyPoints.map((point) => {
          return {
            x: point[0],
            y: point[1],
          };
        });
        setPlotData((prevPlotData) => ({
          ...prevPlotData,
          lagrangeModP: polyPoints,
        }));
        setBottomMsg((prevBottomMsg) => ({
          ...prevBottomMsg,
          lagrangeModP: response.polyString,
        }));
      } else {
        setErrorMsg((prevErrorMsg) => ({
          ...prevErrorMsg,
          lagrangeModP: "Wrong format",
        }));
      }
    }
  };

  const handleSubmitPlotNewtonFieldModP = async (inputValue, p) => {
    const regex = /^\[-?\d+,-?\d+\](,\[-?\d+,-?\d+\])*$/;

    if (regex.test(inputValue)) {
      const inputPoints = JSON.parse(`[${inputValue}]`);
      setPoints((prevPoints) => ({
        ...prevPoints,
        newtonModP: inputPoints.map((point) => ({
          x: point[0] % p,
          y: point[1] % p,
        })),
      }));
      const response = await httpPlotPolyNewtonFieldModP(inputPoints, p);
      const polyPoints = response.polyPoints.map((p) => {
        return {
          x: p[0],
          y: p[1],
        };
      });
      setPlotData((prevPlotData) => ({
        ...prevPlotData,
        newtonModP: polyPoints,
      }));
      setBottomMsg((prevBottomMsg) => ({
        ...prevBottomMsg,
        newtonModP: response.polyString,
      }));
    } else {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        newtonModP: "Wrong format",
      }));
    }
  };

  return {
    points,
    setPoints,
    plotData,
    setPlotData,
    errorMsg,
    bottomMsg,
    setBottomMsg,
    setErrorMsg,
    handleSubmitPlotLagrangeFieldReal,
    handleSubmitPlotNewtonFieldReal,
    handleSubmitPlotLagrangeFieldModP,
    handleSubmitPlotNewtonFieldModP,
  };
};

export default usePlotData;
