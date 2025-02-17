import React from "react";

const SuccessToast = () => (
  <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
    <div
      className="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header bg-success text-white">
        <i className="bi bi-check-circle-fill me-2"></i>
        <strong className="me-auto">Success</strong>
        <small>Just now</small>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">Record Updated Successfully</div>
    </div>
  </div>
);

export default SuccessToast;
