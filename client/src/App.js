import React, { useEffect, useState } from "react";
import "./App.css";
import GenerateSecretModal from "./GenerateSecretModal";
import DecodeSecretModal from "./DecodeSecretModal";
import ClearSecretModal from "./ClearSecretModal";
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
      <div className="header">
        <div className="btn-login">
          <a className="btn btn-primary app-button col-6" href="/auth/google">
            Google Login
          </a>
          <a className="btn btn-secondary app-button col-6" href="/auth/logout">
            Sign Out
          </a>
        </div>
      </div>
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
          {currentPublicDataSecret.totalPeople ? (
            <p>
              The current secret requires the code of{" "}
              {currentPublicDataSecret.requiredPeople} people to be discovered.
              <br /> There are a total of {
                currentPublicDataSecret.totalPeople
              }{" "}
              people with codes (shares).
            </p>
          ) : (
            <p>
              There is no current secret, click on "Generate Secret" to create
              one.
            </p>
          )}
        </div>
        <div className="modal-container">
          <GenerateSecretModal
            setCurrentPublicDataSecret={setCurrentPublicDataSecret}
          />
          <DecodeSecretModal />
          <ClearSecretModal
            setCurrentPublicDataSecret={setCurrentPublicDataSecret}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
