import { useAtom } from "jotai";
import { userPersistenceState } from "../../../jotai/userState"; // Import the Jotai atoms
import useSWR from "swr"; // Import the default SWR hook
import axios from "axios";

// Custom hook to fetch employee data
export const useEmployeeData = ({
  page = 1,
  length = 10,
} = {}) => {
  const [user, setUser] = useAtom(userPersistenceState); // Use Jotai's useAtom hook
  const token = user?.token;
  const queryString = `?length=${length}&page=${page}`;
  const url = `${import.meta.env.VITE_SERVER}/employee${queryString}`;


  const fetcher = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null); // Clear the user state when unauthorized
      }
      throw error;
    }
  };

  // SWR hook to fetch the employee data
  const { data, error, isLoading } = useSWR(
    token ? url : null, 
    fetcher, 
    {
      revalidateOnMount: true, 
      keepPreviousData: true, 
      revalidateOnFocus : false,
    }
  );

  const employees = data?.data?.rows?.data || [];
  const pagination = data?.data?.rows || {};
  
  return { data: employees, pagination, error, isLoading };
};
