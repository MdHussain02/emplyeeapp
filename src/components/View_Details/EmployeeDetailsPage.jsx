import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEmployeeDetailsPageState from "./hooks/useEmployeeDetailsPageState";
import EmployeeDetailsForm from "./Update/EmployeeDetailsForm";
import ProfileImage from "./ProfileImage";
import InfoSection from "./InfoSection";
import SuccessToast from "./SuccessToast";

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    formData,
    editMode,
    showSuccessToast,
    error,
    isLoading,
    handleEdit,
    handleCancel,
    handleSuccess,
  } = useEmployeeDetailsPageState(id);

  if (isLoading || !formData) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Failed to load employee details
        </div>
        <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mt-3">
          <i className="bi bi-arrow-left me-2"></i>Back
        </button>
      </div>
    );
  }

  const gender =
    formData.gender === 1
      ? "male"
      : formData.gender === 2
      ? "female"
      : formData.gender === 3
      ? "others"
      : "N/A";

  const personalInfo = [
    { label: "Employee Code", value: formData.employee_code },
    { label: "Email", value: formData.email },
    { label: "Mobile", value: formData.phone },
    { label: "Date of Birth", value: formData.formatted_dob },
    { label: "Address", value: formData.address },
    { label: "City", value: formData.city },
    { label: "State", value: formData.state },
    { label: "Country", value: formData.country },
    { label: "Gender", value: gender },
    { label: "Zip code", value: formData.zip_code },
  ];

  const employmentInfo = [
    { label: "Department", value: formData.department?.name },
    { label: "Designation", value: formData.designation?.title },
    { label: "Employment Type", value: formData.employment_type?.title },
    { label: "Joining Date", value: formData.formatted_joining_date },
    {
      label: "Salary",
      value: `₹${parseFloat(formData.salary).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
      })}`,
    },
  ];

  const bankingInfo = [
    { label: "Bank Account", value: formData.bank_account_number },
    { label: "IFSC Code", value: formData.ifsc_code },
  ];

  const emergencyInfo = [
    { label: "Emergency Contact", value: formData.emergency_contact },
  ];

  const systemInfo = [
    { label: "Created By", value: formData.created_by?.name },
    { label: "Updated By", value: formData.updated_by?.name },
  ];

  return (
    <div className="container py-5">
      <button className="btn btn-primary" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="text-center mb-4">
                <ProfileImage src={formData.profile_picture} />
                <h2 className="h3 mb-1">{formData.name}</h2>
                <p className="text-muted mb-3">
                  <span className="badge bg-primary">
                    {formData.designation?.title || "Designation"}
                  </span>
                </p>
                {!editMode && (
                  <button onClick={handleEdit} className="btn btn-primary px-4">
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Details
                  </button>
                )}
              </div>

              {editMode ? (
                <EmployeeDetailsForm
                  initialValues={formData}
                  onSuccess={handleSuccess}
                  onCancel={handleCancel}
                />
              ) : (
                <>
                  <InfoSection title="Personal Information" items={personalInfo} />
                  <InfoSection title="Employment Details" items={employmentInfo} />
                  <InfoSection title="Banking Information" items={bankingInfo} />
                  <InfoSection title="Emergency Contact" items={emergencyInfo} />
                  <InfoSection title="System Information" items={systemInfo} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSuccessToast && <SuccessToast />} 
    </div>
  );
};

export default EmployeeDetailsPage;
