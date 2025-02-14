import useSWR from "swr";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userPersistenceState } from "../recoil/userState";

const fetcher = (url, token) =>
  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data.data);

const useMasterData = (key, endpoint) => {
  const user = useRecoilValue(userPersistenceState);
  const token = user?.token;
  const { data, error, isLoading } = useSWR(
    token ? [key, token] : null,
    ([, token]) => fetcher(endpoint, token)
  );
  return { data, error, isLoading };
};

export const useDepartments = () => {
  const { data, error, isLoading } = useMasterData(
    "departments",
    "https://core-skill-test.webc.in/employee-portal/api/v1/settings/departments"
  );
  return { departments: data, error, isLoading };
};

export const useDesignations = () => {
  const { data, error, isLoading } = useMasterData(
    "designations",
    "https://core-skill-test.webc.in/employee-portal/api/v1/settings/designations"
  );
  return { designations: data, error, isLoading };
};

export const useEmploymentTypes = () => {
  const { data, error, isLoading } = useMasterData(
    "employmentTypes",
    "https://core-skill-test.webc.in/employee-portal/api/v1/settings/employment-types"
  );
  return { employmentTypes: data, error, isLoading };
};
