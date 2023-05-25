import React from "react";
import "./App.css";
import ModalApp from "./ModalApp";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">
        Sharing a Secret with Polynomial Interpolation
      </h1>
      <div className="btns-container">
        <ModalApp />
      </div>
    </div>
  );
};

export default App;
