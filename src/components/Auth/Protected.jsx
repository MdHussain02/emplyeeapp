import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
import { userState } from "../../jotai/userState";

const Protected = ({ children }) => {
  const [user] = useAtom(userState);


  return user ? children : <Navigate to="/login" replace />;
};

export default Protected;
