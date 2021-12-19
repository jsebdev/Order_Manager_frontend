import React from "react";
import ReactDOM from "react-dom";
import "./ModalNew.scss";

const ModalNew = ({ setShowModal, children }) => {
  return ReactDOM.createPortal(
    <>
      <div className="neworder">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="neworder-container col-11 col-md-6 px-0 popup">
              <div className="close" onClick={() => setShowModal(false)}>
                <i className="bi bi-plus-lg"></i>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
};

export { ModalNew };
