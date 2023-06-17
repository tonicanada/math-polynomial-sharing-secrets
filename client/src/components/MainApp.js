import Paragraph from "./Paragraph";
import LoggedIn from "./LoggedIn";
import "../App.css";
import { GraphUpArrow } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const MainApp = ({
  user,
  currentPublicDataSecret,
  setCurrentPublicDataSecret,
}) => {
  return (
    <div className="app-container">
      <div className="card-component">
        <h1 className="app-title">
          Sharing a Secret with Polynomial Interpolation
        </h1>
        <div className="paragraph w-90 mt-100">
          <Paragraph />
          {user ? (
            <LoggedIn
              user={user}
              currentPublicDataSecret={currentPublicDataSecret}
              setCurrentPublicDataSecret={setCurrentPublicDataSecret}
            />
          ) : (
            <div>
              <div className="text-center">
                Please Login to be able to generate a secret.
              </div>
            </div>
          )}
        </div>
        <Link className="btn btn-secondary app-button col-12" to="/playground">
          <GraphUpArrow />
          &nbsp;&nbsp;&nbsp;Go to Interpolation Playground&nbsp;&nbsp;&nbsp;
          <GraphUpArrow />
        </Link>
      </div>
    </div>
  );
};

export default MainApp;
