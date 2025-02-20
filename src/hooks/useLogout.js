import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { userState } from "../jotai/userState"

const logoutFetcher = async (url, { arg }) => {
  const response = await axios.post(
    url,
    {},
    { headers: { Authorization: `Bearer ${arg}` } }
  );
  return response.data;
};

const useLogout = () => {
  const [user, setUser] = useAtom(userState); 
  const navigate = useNavigate();
  const { trigger, isMutating, error } = useSWRMutation(
    `${import.meta.env.VITE_SERVER}/settings/logout`,
    logoutFetcher
  );

  const logout = async () => {
    if (!user?.token) return;

    try {
      const response = await trigger(user.token);
      if (response.success) {
        setUser(null); // Clear user state and remove from localStorage
        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      console.error("Logout error: ", err);
    }
  };

  return { logout, isLoggingOut: isMutating, logoutError: error };
};

export default useLogout;
