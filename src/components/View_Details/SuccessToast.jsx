import React, { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

const SuccessToast = ({ message = "Record Updated Successfully" }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="position-fixed bottom-3 end-3 p-3" style={{ zIndex: 1050 }}>
      <div className="toast show d-flex align-items-center bg-success text-white shadow rounded p-3">
        <CheckCircle size={20} className="me-2" />
        <strong className="me-auto">Success</strong>
        <small>Just now</small>
        <button
          type="button"
          className="btn-close btn-close-white ms-3"
          onClick={() => setVisible(false)}
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
      <div className="toast-body backdrop-blur-lg text-black">{message  }</div>
    </div>
  );
};

export default SuccessToast;
