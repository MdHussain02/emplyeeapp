import EmployeeTable from "./Table_items/EmplyeeTable";
import useLogout from "../hooks/useLogout";
import { useAtomValue } from "jotai"; 
import { userState } from "../jotai/userState"; 
import { User, Mail, LogOut } from "lucide-react";

const Home = () => {
  const { logout, isLoggingOut } = useLogout();
  const user = useAtomValue(userState);

  return (
    <div className="container">
      <div className="mt-5 card p-4 shadow-sm">
        <h2 className="card-title d-flex align-items-center gap-2">
          <User size={24} className="text-primary" /> Welcome, {user?.name}
        </h2>
        <p className="card-text text-muted d-flex align-items-center gap-2">
          <Mail size={20} className="text-secondary" /> {user?.email}
        </p>
        <button
          onClick={logout}
          className="btn w-40 ms-2 btn-danger mt-3 d-flex align-items-center gap-2 p-2"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <div className="d-flex">
              <div className="spinner-border text-light" role="status"></div>
            </div>
          ) : (
            <>
              <LogOut size={20} /> Logout
            </>
          )}
        </button>
        <div className="mt-4">
          <EmployeeTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
