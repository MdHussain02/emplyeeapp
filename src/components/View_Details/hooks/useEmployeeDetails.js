import { useMemo } from "react";
import useSWR from "swr";
import axios from "axios";
import { useAtom } from "jotai";
import { userPersistenceState } from "../../../jotai/userState"; // Import the Jotai atoms

const fetcher = async (url, id, token, setUser) => {
  try {
    const response = await axios.get(url, {
      params: { id },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 401) {
      setUser(null); // Clear the user state if unauthorized
    }
    throw error;
  }
};

const useEmployeeDetails = (id) => {
  const [user, setUser] = useAtom(userPersistenceState);
  const token = user?.token;

  // SWR hook to fetch employee details data
  const { data, error, isLoading, mutate } = useSWR(
    token && id ? ["employeeDetails", id, token] : null,
    ([, id, token]) =>
      fetcher(
        `${import.meta.env.VITE_SERVER}/employee/show`,
        id,
        token,
        setUser
      )
  );
  const details = useMemo(() => {
    if (!data) return null;
    return {
      ...data,
      designation_id: data.designation?.id,
      department_id: data.department?.id,
      employment_type_id: data.employment_type?.id,
    };
  }, [data]);

  return { details, error, isLoading, mutate };
};

export default useEmployeeDetails;
