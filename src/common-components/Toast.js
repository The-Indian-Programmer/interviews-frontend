
import React from "react";

const ToastContent = ({ message, status }) => {

    console.log(message, status)
  return (
    <React.Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title fw-bold">{status}</h6>
        </div>
      </div>
      <div className="toastify-body">
        <span>{message}</span>
      </div>
    </React.Fragment>
  );
};

export default ToastContent;
