// src/hooks/useEmployeeData.js
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userPersistenceState } from "../../../recoil/userState";
import useSWR from "swr";
import axios from "axios";

export const useEmployeeData = ({
  page = 1,
  length = 10,
  sort_order = "asc",
  sort_by = "name",
} = {}) => {
  const user = useRecoilValue(userPersistenceState);
  const setUser = useSetRecoilState(userPersistenceState);
  const token = user?.token;
  const queryString = `?length=${length}&page=${page}&sort_order=${sort_order}&sort_by=${sort_by}`;
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
          setUser(null);
      }
      throw error;
    }
  };

  const { data, error, mutate, isValidating } = useSWR(
    token ? url : null,
    fetcher,
    { keepPreviousData: true }
  );

  const employees = data?.data?.rows?.data || [];
  const pagination = data?.data?.rows || {};
  return { data: employees, pagination, error,  isValidating, mutate };
};
