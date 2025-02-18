import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, ArrowLeft, X, Loader2, AlertCircle } from "lucide-react";
import useEmployeeDetailsPageState from "./hooks/useEmployeeDetailsPageState";
import EmployeeDetailsForm from "./Update/EmployeeDetailsForm";
import ProfileImage from "./ProfileImage";
import InfoSection from "./InfoSection";
import SuccessToast from "./SuccessToast";
import {
  getPersonalInfo,
  getEmploymentInfo,
  getBankingInfo,
  getEmergencyInfo,
  getSystemInfo,
} from "./employeeInfo";

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const {
    formData,
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
        <Loader2 size={40} className="text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <AlertCircle size={20} className="me-2" />
          Failed to load employee details
        </div>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-secondary mt-3 d-flex align-items-center"
        >
          <ArrowLeft size={18} className="me-2" /> Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button className="btn btn-outline-primary d-flex align-items-center" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} className="me-2" /> Go Back
      </button>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <div className="text-center mb-4">
                <ProfileImage src={formData.profile_picture} />
                <h2 className="h3 mb-1">{formData.name}</h2>
                <p className="text-muted mb-3">
                  <span className="badge bg-primary">{formData.designation?.title || "Designation"}</span>
                </p>
                <button
                  onClick={() => {
                    handleEdit();
                    setShowModal(true);
                  }}
                  className="btn btn-primary d-flex align-items-center gap-2"
                >
                  <Pencil size={18} /> Edit Details
                </button>
              </div>
              <InfoSection title="Personal Information" items={getPersonalInfo(formData)} />
              <InfoSection title="Employment Details" items={getEmploymentInfo(formData)} />
              <InfoSection title="Banking Information" items={getBankingInfo(formData)} />
              <InfoSection title="Emergency Contact" items={getEmergencyInfo(formData)} />
              <InfoSection title="System Information" items={getSystemInfo(formData)} />
            </div>
          </div>
        </div>
      </div>
      {showSuccessToast && <SuccessToast />}

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-light">
                <h5 className="modal-title">Edit Employee Details</h5>
                <button
                  type="button"
                  className="btn btn-light border-0 d-flex align-items-center"
                  onClick={() => {
                    handleCancel();
                    setShowModal(false);
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <EmployeeDetailsForm
                  key={JSON.stringify(formData)}
                  initialValues={formData}
                  onSuccess={() => {
                    handleSuccess();
                    setShowModal(false);
                  }}
                  onCancel={() => {
                    handleCancel();
                    setShowModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailsPage;
