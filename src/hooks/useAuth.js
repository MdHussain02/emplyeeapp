import { useSetAtom } from "jotai";
import { userState } from "../jotai/userState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useSWRMutation from "swr/mutation";

const useAuth = () => {
  const setUser = useSetAtom(userState);
  const navigate = useNavigate();
  const { trigger, isMutating, error } = useSWRMutation(
    "https://core-skill-test.webc.in/employee-portal/api/v1/auth/login",
    (url, { arg }) =>
      axios.post(url, arg, { headers: { "Content-Type": "application/json" } })
  );
  const login = async (username, password) => {
    try {
      const response = await trigger({ username, password });

      const userData = response?.data?.data;
      if (userData?.token) {
        setUser(userData);
        navigate("/home");
      } else {
        console.error("Authentication failed. Please try again.");
      }
    } catch (err) {
      console.error(
        err?.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return { login, logout, error, isMutating };
};

export default useAuth;
