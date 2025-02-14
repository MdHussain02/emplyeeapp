import React from "react";
import { Form } from "informed";
import { useDepartments, useDesignations, useEmploymentTypes } from "../../../hooks/useMasterData";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import CustomRadioGroup from "./CustomRadioGroup";
import CustomFileInput from "./CustomFileInput";
import useEmployeeFormLogic from './hooks/useEmployeeFormLogic';
const EmployeeDetailsForm = ({ initialValues, onSuccess, onCancel }) => {
  const { handleSubmit, isSaving, fieldErrors } = useEmployeeFormLogic(initialValues, onSuccess);
  const { departments } = useDepartments();
  const { designations } = useDesignations();
  const { employmentTypes } = useEmploymentTypes();
  const personalFields = [
    { label: "Employee Code", field: "employee_code", type: "text" },
    { label: "Name", field: "name", type: "text" },
    { label: "Email", field: "email", type: "email" },
    { label: "Mobile", field: "phone", type: "text" },
    { label: "Date of Birth", field: "date_of_birth", type: "date" },
  ];
  const addressFields = [
    { label: "Address", field: "address", type: "text" },
    { label: "City", field: "city", type: "text" },
    { label: "State", field: "state", type: "text" },
    { label: "Zip Code", field: "zip_code", type: "text" },
    { label: "Country", field: "country", type: "text" },
  ];

  const employmentFields = [
    { label: "Joining Date", field: "joining_date", type: "date" },
    { label: "Salary", field: "salary", type: "number" },
  ];

  const bankingFields = [
    { label: "Bank Account Number", field: "bank_account_number", type: "text" },
    { label: "IFSC Code", field: "ifsc_code", type: "text" },
  ];

  const emergencyFields = [
    { label: "Emergency Contact", field: "emergency_contact", type: "text" },
  ];
  const genderOptions = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2},
    { label: "Other", value: 3 },
  ];
  const renderFormSection = (title, fields) => (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light">
        <h5 className="card-title mb-0">{title}</h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {fields.map(({ label, field, type }) => (
            <div key={field} className="col-md-6">
              <CustomInput
                label={label}
                field={field}
                type={type}
                required
                backendError={fieldErrors[field]}
                className="bg-light rounded p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Form initialValues={initialValues} onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-light">
            <h5 className="card-title mb-0">Profile Picture</h5>
          </div>
          <div className="card-body">
            <CustomFileInput 
              label="Upload Photo" 
              field="profile_picture" 
              backendError={fieldErrors["profile_picture"]}
              className="bg-light rounded p-3"
            />
          </div>
        </div>

        {renderFormSection("Personal Information", personalFields)}

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-light">
            <h5 className="card-title mb-0">Gender</h5>
          </div>
          <div className="card-body">
            <CustomRadioGroup 
              label="Select Gender" 
              field="gender" 
              options={genderOptions} 
              required
              backendError={fieldErrors["gender"]}
              className="bg-light rounded p-3"
            />
          </div>
        </div>

        {renderFormSection("Address Details", addressFields)}

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-light">
            <h5 className="card-title mb-0">Employment Details</h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <CustomSelect 
                  label="Department" 
                  field="department_id" 
                  required 
                  backendError={fieldErrors["department_id"]}
                  className="bg-light rounded p-2"
                >
                  <option value="">Select Department</option>
                  {departments?.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                  ))}
                </CustomSelect>
              </div>
              <div className="col-md-6">
                <CustomSelect 
                  label="Designation" 
                  field="designation_id" 
                  required 
                  backendError={fieldErrors["designation_id"]}
                  className="bg-light rounded p-2"
                >
                  <option value="">Select Designation</option>
                  {designations?.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.title}</option>
                  ))}
                </CustomSelect>
              </div>
              <div className="col-md-6">
                <CustomSelect 
                  label="Employment Type" 
                  field="employment_type_id" 
                  required 
                  backendError={fieldErrors["employment_type_id"]}
                  className="bg-light rounded p-2"
                >
                  <option value="">Select Employment Type</option>
                  {employmentTypes?.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.title}</option>
                  ))}
                </CustomSelect>
              </div>
              {employmentFields.map(({ label, field, type }) => (
                <div key={field} className="col-md-6">
                  <CustomInput
                    label={label}
                    field={field}
                    type={type}
                    required
                    backendError={fieldErrors[field]}
                    className="bg-light rounded p-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {renderFormSection("Banking Information", bankingFields)}
        {renderFormSection("Emergency Contact", emergencyFields)}
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body text-center">
          <button
            type="submit"
            className={`btn ${isSaving ? "btn-secondary" : "btn-primary"} px-4 me-2`}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline-secondary px-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </Form>
  );
};

export default EmployeeDetailsForm;