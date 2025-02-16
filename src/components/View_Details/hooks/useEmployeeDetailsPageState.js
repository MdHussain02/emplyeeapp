// useEmployeeDetailsPageState.js
import { useState, useEffect, useCallback } from "react";
import useEmployeeDetails from "./useEmployeeDetails"; 
const useEmployeeDetailsPageState = (id) => {
  const { details, error, isLoading, mutate } = useEmployeeDetails(id);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  useEffect(() => {
    if (details && !editMode) {
      setFormData(details);
    }
  }, [details, editMode]);

  const handleEdit = useCallback(() => setEditMode(true), []);
  const handleCancel = useCallback(() => setEditMode(false), []);
  const handleSuccess = useCallback(
    (payload) => {
      setEditMode(false);
      setShowSuccessToast(true);
      setFormData(payload);
      mutate();
      setTimeout(() => setShowSuccessToast(false), 3000);
    },
    [mutate]
  );

  return {
    formData,
    editMode,
    showSuccessToast,
    error,
    isLoading,
    handleEdit,
    handleCancel,
    handleSuccess,
  };
};

export default useEmployeeDetailsPageState;
