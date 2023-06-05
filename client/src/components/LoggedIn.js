import GenerateSecretModal from "../GenerateSecretModal";
import DecodeSecretModal from "../DecodeSecretModal";
import ClearSecretModal from "../ClearSecretModal";

const LoggedIn = ({
  user,
  currentPublicDataSecret,
  setCurrentPublicDataSecret,
}) => {
  return (
    <div>
      <div className="current-secret">
        <p>Hello, {user.name}!:</p>
        {currentPublicDataSecret.totalPeople ? (
          <p>
            Your current secret requires the code of{" "}
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
  );
};

export default LoggedIn;
