import React from "react";
import ReactDOM from "react-dom";
import "./ModalNew.scss";

/**
 * This Function is a modal div architecture for the modals
 * @param {JSX.Element} props.children - Elements to render in modal
 * @param {String} props.elementId - div's id where to render the modal
 * @param {Function} props.setShowModal - Function to set state to hide modal
 * @returns A base modal div architecture where all modals of the application are placed as the children
 */
const ModalNew = ({ children, elementId, setShowModal }) => {
  return ReactDOM.createPortal(
    <>
      <div className="background">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="modal-container col-11 col-md-6 px-0 popup">
              <div className="close" onClick={() => setShowModal(false)}>
                <i className="bi bi-plus-lg"></i>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById(elementId)
  );
};

export { ModalNew };
