export const validateEmployeeForm = (values, masterData) => {
  const errors = {};

  // Validation Helpers
  const isValidName = (name) => /^[A-Za-z\s'-]{3,50}$/.test(name);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^(?:\+91)?[6-9]\d{9}$/.test(phone);
  const isValidIFSC = (ifsc) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
  const isValidZipCode = (zip) => /^\d{6}$/.test(zip);
  const isValidBankAccount = (acc) => /^\d{9,18}$/.test(acc);
  const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);

  // Required Fields
  const requiredFields = [
    "name", "email", "phone", "designation_id", "department_id",
    "gender", "date_of_birth", "address", "city", "state",
    "zip_code", "country", "employee_code", "employment_type_id",
    "joining_date", "salary", "bank_account_number", "ifsc_code",
    "emergency_contact"
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "This field is required";
    }
  });

  // Name Validation
  if (values.name && !isValidName(values.name)) {
    errors.name = "Name must be 3-50 characters long and contain only alphabets, spaces, or hyphens";
  }

  // Email Validation
  if (values.email && !isValidEmail(values.email)) {
    errors.email = "Invalid email format";
  }

  // Phone Number Validation
  if (values.phone && !isValidPhone(values.phone)) {
    errors.phone = "Invalid phone number format";
  }

  // Gender Validation
  if (!["1", "2", "3"].includes(String(values.gender))) {
    errors.gender = "Invalid gender selection";
  }

  // Date of Birth Validation
  if (values.date_of_birth && !isValidDate(values.date_of_birth)) {
    errors.date_of_birth = "Invalid date format (YYYY-MM-DD required)";
  }

  // Zip Code Validation
  if (values.zip_code && !isValidZipCode(values.zip_code)) {
    errors.zip_code = "Zip code must be exactly 6 digits";
  }

  // Salary Validation
  if (values.salary && (isNaN(values.salary) || values.salary < 0)) {
    errors.salary = "Salary must be a positive number";
  }

  // Bank Account Validation
  if (values.bank_account_number && !isValidBankAccount(values.bank_account_number)) {
    errors.bank_account_number = "Invalid bank account number (9-18 digits required)";
  }

  // IFSC Code Validation
  if (values.ifsc_code && !isValidIFSC(values.ifsc_code)) {
    errors.ifsc_code = "Invalid IFSC code format";
  }

  // Emergency Contact Validation
  if (values.emergency_contact && !isValidPhone(values.emergency_contact)) {
    errors.emergency_contact = "Invalid emergency contact format";
  }

  // Profile Picture Validation
  if (values.profile_picture && typeof values.profile_picture !== "string") {
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
    const fileName = values.profile_picture.name.toLowerCase();
    const allowedExtensions = [".jpg", ".jpeg", ".png"];

    // Check MIME Type & File Extension
    if (!allowedFormats.includes(values.profile_picture.type) || 
        !allowedExtensions.some((ext) => fileName.endsWith(ext))) {
      errors.profile_picture = "Invalid file format (JPEG, PNG, JPG only)";
    }

    // Check File Size (Max: 2MB)
    if (values.profile_picture.size > 2 * 1024 * 1024) {
      errors.profile_picture = "File size must be less than 2MB";
    }
  }

  // Dropdown Validation (Check if values exist in master data)
  if (
    masterData?.employmentTypes &&
    !masterData.employmentTypes.some((type) => type.id === values.employment_type_id)
  ) {
    errors.employment_type_id = "Invalid employment type selection";
  }

  if (
    masterData?.designations &&
    !masterData.designations.some((desig) => desig.id === values.designation_id)
  ) {
    errors.designation_id = "Invalid designation selection";
  }

  if (
    masterData?.departments &&
    !masterData.departments.some((dept) => dept.id === values.department_id)
  ) {
    errors.department_id = "Invalid department selection";
  }

  return errors;
};
