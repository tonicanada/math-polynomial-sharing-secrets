import Paragraph from "./Paragraph";
import LoggedIn from "./LoggedIn";
import "../App.css";

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
        <div className="paragraph text-center mt-100">
          <Paragraph />
          {user ? (
            <LoggedIn
              user={user}
              currentPublicDataSecret={currentPublicDataSecret}
              setCurrentPublicDataSecret={setCurrentPublicDataSecret}
            />
          ) : (
            <div>
              <div>Please Login to be able to generate a secret.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
