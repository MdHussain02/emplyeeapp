import React from "react";
import { useField } from "informed";

const CustomFileInput = ({ label, field, backendError, ...rest }) => {
  const { fieldState, fieldApi } = useField({ field });
  const { touched, error } = fieldState;
  const displayError = touched && (error || backendError);

  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label fw-bold">{label}</label>
      <input
        type="file"
        id={field}
        name={field}
        className="form-control"
        onChange={(e) => {
          // Set the file (first file from the input) in the form state
          fieldApi.setValue(e.target.files[0]);
        }}
        {...rest}
      />
      {displayError && <div className="text-danger small">{error || backendError}</div>}
    </div>
  );
};

export default CustomFileInput;
