import React from "react";
import "./App.css";
import GenerateSecretModal from "./GenerateSecretModal";
import DecodeSecretModal from "./DecodeSecretModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <h1 className="app-title">
          Sharing a Secret with Polynomial Interpolation
        </h1>
        <div className="btns-container">
          <GenerateSecretModal />
          <DecodeSecretModal />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
