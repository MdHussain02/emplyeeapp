import { useState, useCallback } from "react";
import useEmployeeDetails from "./useEmployeeDetails";
const useEmployeeDetailsPageState = (id) => {
  const { details, error, isLoading, mutate } = useEmployeeDetails(id);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(details || null); 
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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
  if (details && !editMode && !formData) {
    setFormData(details);
  }
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
