import React from "react";
import { Form } from "informed";
import CustomField from "./CustomField";

const validateEmail = (value) => {
  if (!value) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !regex.test(value) ? "Invalid email address" : undefined;
};

const LoginForm = ({ onSubmit, error }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card w-100" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <Form onSubmit={onSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <CustomField
                name="username"
                label="Email"
                placeholder="Enter your email"
                validate={validateEmail}
                validateOn="change"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <CustomField
                name="password"
                label="Password"
                fieldType="password"
                placeholder="Enter your password"
                validate={(value) => (!value ? "Password is required" : undefined)}
                validateOn="change"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
