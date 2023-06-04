import React, { useState } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import { httpClearSecret } from "./requests";

Modal.setAppElement("#root");

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "10px",
    overflow: "auto",
  },
};

const FirstModal = ({ isOpen, onClose, onClick }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customModalStyles}>
      <p className="fs-4 text-center">Are you sure to clear the secret?</p>
      <Button className="col-12 fs-5 mt-4" onClick={onClick}>
        Clear
      </Button>
    </Modal>
  );
};

const SecondModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customModalStyles}>
      <p className="fs-4">{message}</p>

      <Button className="col-12 fs-5 mt-4" onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
};

const ClearSecretModal = ({ setCurrentPublicDataSecret }) => {
  const [firstModalIsOpen, setFirstModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openFirstModal = () => {
    setFirstModalIsOpen(true);
  };

  const closeFirstModal = () => {
    setFirstModalIsOpen(false);
  };

  const closeSecondModal = () => {
    setSecondModalIsOpen(false);
    setMessage("");
  };

  const handleSubmitClearSecret = async () => {
    try {
      const response = await httpClearSecret();
      if (response.ok) {
        closeFirstModal();
        setMessage("Secret cleared successfully!");
        setSecondModalIsOpen(true);
        setCurrentPublicDataSecret({})
      } else {
        closeFirstModal();
        setMessage(
          "There was some problem clearing the secret, please try again"
        );
        setSecondModalIsOpen(true);
        throw new Error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-container">
      <Button
        variant="primary"
        className="btn btn-primary app-button"
        onClick={openFirstModal}
      >
        Clear Secret
      </Button>
      <FirstModal
        isOpen={firstModalIsOpen}
        onClose={closeFirstModal}
        onClick={handleSubmitClearSecret}
      />
      <SecondModal
        isOpen={secondModalIsOpen}
        onClose={closeSecondModal}
        message={message}
      />
    </div>
  );
};

export default ClearSecretModal;
