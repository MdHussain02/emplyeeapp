export const validateEmployeeForm = (values) => {
    const errors = {};
  
    // Helper functions
    const isValidEmail = (email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
    const isValidPhone = (phone) =>
      /^(?:\+91)?[6-9]\d{9}$/.test(phone);
  
    const isValidIFSC = (ifsc) =>
      /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
  
    const isValidZipCode = (zip) =>
      /^\d{6}$/.test(zip);
  
    const isValidBankAccount = (acc) =>
      /^\d{9,18}$/.test(acc);
  
    const isValidDate = (date) =>
      /^\d{4}-\d{2}-\d{2}$/.test(date);
  
    // Required field validation
    const requiredFields = [
      "name", "email", "phone", "designation_id", "department_id",
      "gender", "date_of_birth", "address", "city", "state",
      "zip_code", "country", "employee_code", "employment_type_id",
      "joining_date", "salary", "bank_account_number", "ifsc_code",
      "emergency_contact"
    ];
  
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = "This field is required";
      }
    });
  
    // Field-specific validation
    if (values.name && values.name.length > 255) {
      errors.name = "Maximum length is 255 characters";
    }
  
    if (values.email && !isValidEmail(values.email)) {
      errors.email = "Invalid email format";
    }
  
    if (values.phone && !isValidPhone(values.phone)) {
      errors.phone = "Invalid phone number format";
    }
  
    if (!["1", "2", "3"].includes(String(values.gender))) {
      errors.gender = "Invalid gender selection";
    }
  
    if (values.date_of_birth && !isValidDate(values.date_of_birth)) {
      errors.date_of_birth = "Invalid date format (YYYY-MM-DD required)";
    }
  
    if (values.address && values.address.length > 255) {
      errors.address = "Maximum length is 255 characters";
    }
  
    if (values.city && values.city.length > 100) {
      errors.city = "Maximum length is 100 characters";
    }
  
    if (values.state && values.state.length > 100) {
      errors.state = "Maximum length is 100 characters";
    }
  
    if (values.zip_code && !isValidZipCode(values.zip_code)) {
      errors.zip_code = "Zip code must be exactly 6 digits";
    }
  
    if (values.country && values.country.length > 100) {
      errors.country = "Maximum length is 100 characters";
    }
  
    if (values.salary && (isNaN(values.salary) || values.salary < 0)) {
      errors.salary = "Salary must be a positive number";
    }
  
    if (values.bank_account_number && !isValidBankAccount(values.bank_account_number)) {
      errors.bank_account_number = "Invalid bank account number (9-18 digits required)";
    }
  
    if (values.ifsc_code && !isValidIFSC(values.ifsc_code)) {
      errors.ifsc_code = "Invalid IFSC code format";
    }
  
    if (values.emergency_contact && !isValidPhone(values.emergency_contact)) {
      errors.emergency_contact = "Invalid emergency contact format";
    }
  
    if (values.profile_picture) {
      const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedFormats.includes(values.profile_picture.type)) {
        errors.profile_picture = "Invalid file format (JPEG, PNG, JPG only)";
      }
      if (values.profile_picture.size > 2 * 1024 * 1024) {
        errors.profile_picture = "File size must be less than 2MB";
      }
    }
  
    return errors;
  };
  