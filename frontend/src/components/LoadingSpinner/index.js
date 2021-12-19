import React from "react";
import ReactDOM from "react-dom";
import "./LoadingSpinner.scss";

export const LoadingSpinner = () => {
  return ReactDOM.createPortal(
    <div className="spinner-background">
      <div className="spinner">
        <div></div>
        <div></div>
      </div>
    </div>,
    document.getElementById("loading-modal")
  );
};
