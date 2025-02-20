import { useState } from "react";
import { useAtom } from "jotai";
import { userState } from "../jotai/userState"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useSWRMutation from "swr/mutation";



const useAuth = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useAtom(userState); 
  const navigate = useNavigate();

  const { trigger, isMutating } = useSWRMutation(
    "https://core-skill-test.webc.in/employee-portal/api/v1/auth/login",
    (url, { arg }) =>
      axios.post(url, arg, { headers: { "Content-Type": "application/json" } })
  );

  const login = async (username, password) => {
    setError(""); // Reset any previous error
    try {
      const response = await trigger({ username, password });

      const userData = response?.data?.data;
      if (userData?.token) {
        setUser(userData); // Update user state (automatically syncs with localStorage)
        navigate("/home");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  const logout = () => {
    setUser(null); // Clear user state (also removes from localStorage)
    navigate("/");
  };

  return { login, logout, error, isMutating };
};

export default useAuth;
