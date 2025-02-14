import EmployeeTable from "./Table_items/EmplyeeTable";
import useLogout from "../hooks/useLogout";
import { useRecoilValue } from "recoil";
import { userPersistenceState } from "../recoil/userState";

const Home = () => {
  const { logout } = useLogout();
  const user = useRecoilValue(userPersistenceState);

  return (
    <div className="container">
      <div className="mt-5">
        <h2 className="card-title">Welcome, {user?.name}</h2>
        <p className="card-text text-muted">Email: {user?.email}</p>
        <button onClick={logout} className="btn btn-danger mt-3">
          Logout
        </button>
        <div className="mt-4">
          <EmployeeTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
