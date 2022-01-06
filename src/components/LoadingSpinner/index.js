import React from "react";
import ReactDOM from "react-dom";
import "./LoadingSpinner.scss";

/**
 * This component is a spinner that is shown while waiting for an asynchronous process
 * @returns Loading spinner component
 */
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
