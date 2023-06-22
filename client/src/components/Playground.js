import "../App.css";
import "./Playground.css";
import CardWithPlot from "./CardWithPlot";
import { Link } from "react-router-dom";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import usePlotData from "../utils/usePlotData";
import { calculateNextPrime } from "../utils/utilsFunctions";
import { useState } from "react";

const Playground = () => {
  const {
    points,
    setPoints,
    plotData,
    setPlotData,
    errorMsg,
    setErrorMsg,
    bottomMsg,
    setBottomMsg,
    handleSubmitPlotLagrangeFieldReal,
    handleSubmitPlotNewtonFieldReal,
    handleSubmitPlotLagrangeFieldModP,
    handleSubmitPlotNewtonFieldModP,
  } = usePlotData();

  const [inputPrimeValue, setInputPrimeValue] = useState("");
  const [prime, setPrime] = useState("");
  const [errorPrime, setErrorPrime] = useState("");

  const handleInputPrimeChange = (event) => {
    const value = event.target.value;
    setInputPrimeValue(value);

    if (parseInt(value) > 2 ** 46) {
      setInputPrimeValue("");
      setPrime("");
      setErrorPrime("The number exceeds the maximum limit");
    }

    if (parseInt(value) > 1000) {
      const prime = calculateNextPrime(value);
      setPrime(prime.toString());
    } else {
      setPrime("");
      setErrorPrime("");
    }
  };

  return (
    <div className="app-container">
      <div className="playcard-component">
        <h1 className="play-title">Polynomial Interpolation Playground</h1>
        <Link to="/" className="back-link">
          Back to app
        </Link>
        <div>
          <p className="play-text">
            For any integer <InlineMath>n \geq 0</InlineMath> and any list of{" "}
            <InlineMath>n+1</InlineMath> points{" "}
            <InlineMath>{`(x_1, y_1), (x_2, y_2), ..., (x_{n+1}, y_{n+1})`}</InlineMath>{" "}
            in <InlineMath>\Reals^2</InlineMath> with{" "}
            <InlineMath>{`x_1 < x_2 < ... < x_{n+1}`}</InlineMath>, there exists
            a unique polynomial <InlineMath>p(x)</InlineMath> of degree at most{" "}
            <InlineMath>n</InlineMath> such that{" "}
            <InlineMath>p(x_i) = y_i</InlineMath> for all{" "}
            <InlineMath>i</InlineMath>. There are 2 main ways to compute this
            polynomial,{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Lagrange_polynomial"
            >
              Lagrange
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Newton_polynomial"
            >
              Newton Interpolation
            </a>{" "}
            .
          </p>
        </div>

        <div className="plot-container">
          <div className="h-100 d-flex flex-column align-items-center">
            <h5 className="text-center">Lagrange Interpolation</h5>
            <div className="formula">
              <BlockMath>{`f(x)=\\sum_{i=1}^{n+1} \\ y_i \\ \\left( \\prod_{j \\neq i} \\frac{x-x_j}{x_i-x_j} \\right)`}</BlockMath>
            </div>
            <CardWithPlot
              plotTitle={
                <div>
                  Lagrange Interpolation <br /> Polynomial field:{" "}
                  <InlineMath>{`\\Reals`}</InlineMath>
                </div>
              }
              handleSubmit={handleSubmitPlotLagrangeFieldReal}
              points={points.lagrange}
              setPoints={(newPoints) =>
                setPoints({ ...points, lagrange: newPoints })
              }
              plotData={plotData.lagrange}
              setPlotData={(newPlotData) =>
                setPlotData({ ...plotData, lagrange: newPlotData })
              }
              setBottomMsg={(newBottomMsg) =>
                setBottomMsg({ ...bottomMsg, lagrange: newBottomMsg })
              }
              errorMsg={errorMsg.lagrange}
              setErrorMsg={(newErrorMsg) =>
                setErrorMsg({ ...errorMsg, lagrange: newErrorMsg })
              }
              bottomMsg={bottomMsg.lagrange}
            />
          </div>
          <div className="h-100 d-flex flex-column align-items-center">
            <h5 className="text-center">Newton Interpolation</h5>
            <div className="formula">
              <BlockMath>{`\\begin{align*} f(x)=[y_1] + [y_1, y_2](x-x_1) + ... \\\\ + [y_1, ..., y_{n+1}](x-x_0)(x-x_1)\\dots(x-x_{n}) \\end{align*}`}</BlockMath>
            </div>
            <CardWithPlot
              plotTitle={
                <div>
                  Newton Interpolation <br /> Polynomial field:{" "}
                  <InlineMath>{`\\Reals`}</InlineMath>
                </div>
              }
              handleSubmit={handleSubmitPlotNewtonFieldReal}
              points={points.newton}
              setPoints={(newPoints) =>
                setPoints({ ...points, newton: newPoints })
              }
              plotData={plotData.newton}
              setPlotData={(newPlotData) =>
                setPlotData({ ...plotData, newton: newPlotData })
              }
              setBottomMsg={(newBottomMsg) =>
                setBottomMsg({ ...bottomMsg, newton: newBottomMsg })
              }
              errorMsg={errorMsg.newton}
              setErrorMsg={(newErrorMsg) =>
                setErrorMsg({ ...errorMsg, newton: newErrorMsg })
              }
              bottomMsg={bottomMsg.newton}
            />
          </div>
        </div>
        <hr />
        <div className="prime-number-input">
          <label htmlFor="primeNumberInput">
            Enter a number and next prime will be computed:
          </label>
          <div className="col-12 d-flex flex-row justify-content-center mx-auto text-center">
            <input
              type="number"
              id="primeNumberInput"
              className="form-control form-control-sm rounded-left text-end small-input"
              placeholder="Enter num greater than 1000"
              value={inputPrimeValue}
              onChange={handleInputPrimeChange}
            />
            <input
              type="number"
              id="primeInput"
              className="form-control form-control-sm rounded-left text-end small-input"
              placeholder="Prime number"
              value={prime}
              readOnly
            />
          </div>
          {errorPrime && <div className="prime-error">{errorPrime}</div>}
        </div>
        <div className="plot-container">
          <div className="h-100 d-flex flex-column align-items-center">
            <CardWithPlot
              plotTitle={
                <div>
                  Lagrange Interpolation <br /> Polynomial field:{" "}
                  <InlineMath>
                    {prime ? `\\Z_{${prime}}` : `\\Z_{P}`}
                  </InlineMath>
                </div>
              }
              handleSubmit={handleSubmitPlotLagrangeFieldModP}
              points={points.lagrangeModP}
              setPoints={(newPoints) =>
                setPoints({ ...points, lagrangeModP: newPoints })
              }
              plotData={plotData.lagrangeModP}
              setPlotData={(newPlotData) =>
                setPlotData({ ...plotData, lagrangeModP: newPlotData })
              }
              setBottomMsg={(newBottomMsg) =>
                setBottomMsg({ ...bottomMsg, lagrangeModP: newBottomMsg })
              }
              errorMsg={errorMsg.lagrangeModP}
              setErrorMsg={(newErrorMsg) =>
                setErrorMsg({ ...errorMsg, lagrangeModP: newErrorMsg })
              }
              bottomMsg={bottomMsg.lagrangeModP}
              prime={prime}
              setErrorPrime={setErrorPrime}
            />
          </div>
          <CardWithPlot
            plotTitle={
              <div>
                Newton Interpolation <br /> Polynomial field:{" "}
                <InlineMath>{prime ? `\\Z_{${prime}}` : `\\Z_{P}`}</InlineMath>
              </div>
            }
            handleSubmit={handleSubmitPlotNewtonFieldModP}
            points={points.newtonModP}
            setPoints={(newPoints) =>
              setPoints({ ...points, newtonModP: newPoints })
            }
            plotData={plotData.newtonModP}
            setPlotData={(newPlotData) =>
              setPlotData({ ...plotData, newtonModP: newPlotData })
            }
            setBottomMsg={(newBottomMsg) =>
              setBottomMsg({ ...bottomMsg, newtonModP: newBottomMsg })
            }
            errorMsg={errorMsg.newtonModP}
            setErrorMsg={(newErrorMsg) =>
              setErrorMsg({ ...errorMsg, newtonModP: newErrorMsg })
            }
            bottomMsg={bottomMsg.newtonModP}
            prime={prime}
            setErrorPrime={setErrorPrime}
          />
        </div>
      </div>
    </div>
  );
};

export default Playground;
