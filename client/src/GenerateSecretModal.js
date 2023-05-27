import React, { useState } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import { httpGenerateSecret, httpDownloadShares } from "./requests";

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
    overflow: "auto", // Reemplaza 'padding' por 'overflow: auto'
  },
};

const FirstModal = ({ isOpen, onClose, onSubmit, header }) => {
  const [totalPeople, setTotalPeople] = useState("");
  const [requiredPeople, setRequiredPeople] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(totalPeople, requiredPeople);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customModalStyles}>
      <h2 className="mb-4 fs-3">Please enter the data</h2>
      <form onSubmit={handleSubmit}>
        <label className="fs-5 col-8">
          Total number of people the secret will be shared with:
        </label>
        <input
          type="number"
          className="col-4 fs-5 text-dark"
          value={totalPeople}
          onChange={(e) => setTotalPeople(e.target.value)}
        />
        <br />
        <label className="fs-5 col-8">
          Number of people needed to decode the secret:
        </label>
        <input
          className="col-4 fs-5 text-dark"
          type="number"
          value={requiredPeople}
          onChange={(e) => setRequiredPeople(e.target.value)}
        />
        <br />
        <Button type="submit" variant="primary" className="mt-4 fs-5 col-12">
          Generate Secret!
        </Button>
      </form>
    </Modal>
  );
};

const SecondModal = ({ isOpen, onClose, message, onDownloadClick }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customModalStyles}>
      <p className="fs-4">{message}</p>
      <Button
        className="col-12 fs-5 mt-2 btn-secondary"
        onClick={() => {
          onDownloadClick();
          onClose();
        }}
      >
        Download Shares
      </Button>
      <Button className="col-12 fs-5 mt-4" onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
};

const GenerateSecretModal = () => {
  const [firstModalIsOpen, setFirstModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [totalPeople, setTotalPeople] = useState("");
  const [requiredPeople, setRequiredPeople] = useState("");

  const openFirstModal = () => {
    setFirstModalIsOpen(true);
  };

  const closeFirstModal = () => {
    setFirstModalIsOpen(false);
  };

  const closeSecondModal = () => {
    setSecondModalIsOpen(false);
    setTotalPeople("");
    setRequiredPeople("");
    setMessage("");
  };

  const handleSubmitFirstModal = async (total, required) => {
    total = Number(total);
    required = Number(required);

    try {
      if (required > total) {
        closeFirstModal();
        setMessage("Total people must be greater than the required people");
        setSecondModalIsOpen(true);
        return;
      }

      // Call API
      const response = await httpGenerateSecret(total, required);

      if (response.ok) {
        closeFirstModal();
        setMessage("Secret generated successfully!");
        setSecondModalIsOpen(true);
      } else {
        // La llamada a la API falló
        closeFirstModal();
        setMessage(
          "There was some problem generating the secret, please try again"
        );
        setSecondModalIsOpen(true);
        throw new Error("Error al llamar a la API");
      }
    } catch (error) {
      // Manejar el error de la llamada a la API
      console.error(error);
      // Mostrar un mensaje de error al usuario si es necesario
    }
  };

  const handleSubmitDownloadShares = async () => {
    const response = await httpDownloadShares();
    console.log(response);
  };

  return (
    <div className="modal-container">
      <Button
        variant="primary"
        className="app-button btn-lg"
        onClick={openFirstModal}
        style={{ width: '200px' }}
      >
        Generate Secret
      </Button>
      <FirstModal
        isOpen={firstModalIsOpen}
        onClose={closeFirstModal}
        onSubmit={handleSubmitFirstModal}
      />
      <SecondModal
        isOpen={secondModalIsOpen}
        onClose={closeSecondModal}
        message={message}
        onDownloadClick={handleSubmitDownloadShares}
      />
    </div>
  );
};

export default GenerateSecretModal;