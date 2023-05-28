import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { FileList } from "./FileList";
import { httpCheckSecret } from "./requests";
import ScatterPlot from "./ScatterPlot";

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

export const TargetBox = (props) => {
  const style = {
    border: "1px solid gray",
    height: "100px",
    width: "100%",
    padding: "2rem",
    textAlign: "center",
  };
  const { onDrop } = props;
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item) {
        if (onDrop) {
          onDrop(item);
        }
      },
      canDrop(item) {
        console.log("canDrop", item.files, item.items);
        return true;
      },
      hover(item) {
        console.log("hover", item.files, item.items);
      },
      collect: (monitor) => {
        const item = monitor.getItem();
        if (item) {
          console.log("collect", item.files, item.items);
        }
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [props]
  );
  const isActive = canDrop && isOver;
  return (
    <div ref={drop} style={style}>
      {isActive ? "Release to drop" : "Drag excel file here"}
    </div>
  );
};

const FirstModal = ({
  isOpen,
  onClose,
  onClick,
  droppedFiles,
  setDroppedFiles,
}) => {
  const handleFileDrop = useCallback(
    (item) => {
      if (item) {
        const files = item.files;
        setDroppedFiles(files);
      }
    },
    [setDroppedFiles]
  );

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customModalStyles}>
      <h2 className="mb-4 fs-3">Please enter the data</h2>
      <TargetBox onDrop={handleFileDrop} />
      <FileList files={droppedFiles} />
      <Button className="col-12 fs-5 mt-4" onClick={onClick}>
        Check!
      </Button>
    </Modal>
  );
};

const SecondModal = ({ isOpen, onClose, message, plotData }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customModalStyles}>
      {plotData.length > 0 ? (
        <div>
          <p className="fs-4 text-center">
            Secret decoded successfully!!! <br />
            Its value is f(0)={Number(message).toLocaleString()}
          </p>
          <ScatterPlot plotData={plotData} />
        </div>
      ) : (
        <p className="fs-4 text-center">{message}</p>
      )}

      <Button className="col-12 fs-5 mt-4" onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
};

const DecodeSecretModal = () => {
  const [firstModalIsOpen, setFirstModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [plotData, setPlotData] = useState([]);

  const openFirstModal = () => {
    setFirstModalIsOpen(true);
  };

  const closeFirstModal = () => {
    setFirstModalIsOpen(false);
  };

  const closeSecondModal = () => {
    setSecondModalIsOpen(false);
    setMessage("");
    setPlotData([]);
  };

  const [droppedFiles, setDroppedFiles] = useState([]);

  const handleSubmitCheckSecret = async () => {
    try {
      const response = await httpCheckSecret(droppedFiles);
      if (response.ok) {
        closeFirstModal();
        setMessage(response.data["message"]);
        setSecondModalIsOpen(true);
        setDroppedFiles([]);
        setPlotData(response.data.plotData);
      } else {
        closeFirstModal();
        setMessage(
          "There was some problem decoding the secret, please try again"
        );
        setSecondModalIsOpen(true);
        setDroppedFiles([]);
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
        className="app-button btn-lg"
        onClick={openFirstModal}
        style={{ width: "200px" }}
      >
        Decode Secret
      </Button>
      <FirstModal
        isOpen={firstModalIsOpen}
        onClose={closeFirstModal}
        onClick={handleSubmitCheckSecret}
        droppedFiles={droppedFiles}
        setDroppedFiles={setDroppedFiles}
      />
      <SecondModal
        isOpen={secondModalIsOpen}
        onClose={closeSecondModal}
        message={message}
        plotData={plotData}
      />
    </div>
  );
};

export default DecodeSecretModal;
