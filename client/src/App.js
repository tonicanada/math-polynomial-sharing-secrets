import React, { useEffect, useState } from "react";
import "./App.css";
import GenerateSecretModal from "./GenerateSecretModal";
import DecodeSecretModal from "./DecodeSecretModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { httpGetPublicDataCurrentSecret } from "./requests";

const App = () => {
  const [currentPublicDataSecret, setCurrentPublicDataSecret] = useState({});

  const fetchPublicDataCurrentSecret = async () => {
    const data = await httpGetPublicDataCurrentSecret();
    setCurrentPublicDataSecret(data);
  };

  useEffect(() => {
    fetchPublicDataCurrentSecret();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <h1 className="app-title">
          Sharing a Secret with Polynomial Interpolation
        </h1>
        <div className="paragraph text-center mt-100">
          <p>
            This web-app serves as a practical example of the concepts discussed
            in the article{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://web.mit.edu/6.857/OldStuff/Fall03/ref/Shamir-HowToShareASecret.pdf"
            >
              How to Share a Secret
            </a>{" "}
            written by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Adi_Shamir"
            >
              Adi Shamir
            </a>{" "}
            (MIT) and published in Communications of the ACM, November 1979,
            Volume 22, Number 11.
          </p>
        </div>
        <div className="paragraph text-center border p-3 current-secret">
          <p>Current Secret Info:</p>
          <p>
            The current secret requires the code of{" "}
            {currentPublicDataSecret.requiredPeople} people to be discovered.
            <br /> There are a total of {
              currentPublicDataSecret.totalPeople
            }{" "}
            people with codes (shares).
          </p>
        </div>
        <div className="btns-container">
          <GenerateSecretModal
            setCurrentPublicDataSecret={setCurrentPublicDataSecret}
          />
          <DecodeSecretModal />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
