import { useAtom } from "jotai"; // Use Jotai's useAtom hook
import { userPersistenceState } from "../jotai/userState"; // Import the Jotai user state
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import axios from "axios";

const logoutFetcher = async (url, { arg }) => {
  const response = await axios.post(
    url,
    {},
    { headers: { Authorization: `Bearer ${arg}` } }
  );
  return response.data;
};

const useLogout = () => {
  const [user, setUser] = useAtom(userPersistenceState); // Use Jotai's atom for state
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
        setUser(null); // Clear the user state in Jotai
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { logout, isLoggingOut: isMutating, logoutError: error };
};

export default useLogout;
