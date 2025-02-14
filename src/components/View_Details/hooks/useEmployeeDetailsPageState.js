// useEmployeeDetailsPageState.js
import { useState, useEffect, useCallback } from "react";
import useEmployeeDetails from "./useEmployeeDetails"; 
const useEmployeeDetailsPageState = (id) => {
  // Fetch employee details using your existing hook
  const { details, error, isLoading, mutate } = useEmployeeDetails(id);

  // Local state management
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Sync formData with fetched details when not editing
  useEffect(() => {
    if (details && !editMode) {
      setFormData(details);
    }
  }, [details, editMode]);

  // Handlers for toggling edit mode and for update success
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
