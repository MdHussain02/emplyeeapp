  import React, { useState } from "react";
  import { Navigate } from "react-router-dom";
  import { useRecoilValue } from "recoil";
  import { userState } from "../../recoil/userState";
  import useAuth from "../../hooks/useAuth";
  import { Form } from "informed";
  import { Eye, EyeOff } from "lucide-react";
  import CustomField from "./CustomField";

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(value) ? "Invalid email address" : undefined;
  };
  const Login = () => {
    const { login, error } = useAuth();
    const user = useRecoilValue(userState);
    const [showPassword, setShowPassword] = useState(false);
    if (user) {
      return <Navigate to="/home" replace />;
    }
    const handleSubmit = (values) => {
      login(values.values.username, values.values.password);
    };
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
            <Form onSubmit={handleSubmit}>
              <CustomField
                label="Email" 
                name="username"
                validate={validateEmail}
                required
              />

              <CustomField
                label="Password"
                name="password"
                fieldType={showPassword ? "text" : "password"}
                validate={(value) => (!value ? "Password is required" : undefined)}
                required
                append={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-outline-secondary"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
              />

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </Form>
          </div>
        </div>
      </div>
    );
  };

  export default Login;
