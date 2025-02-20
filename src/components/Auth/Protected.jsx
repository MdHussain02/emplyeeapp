import { useAtom } from "jotai"; // Import useAtom from Jotai
import { Navigate } from "react-router-dom";
import { userState } from "../../jotai/userState";

const Protected = ({ children }) => {
  const [user] = useAtom(userState); // Use Jotai's useAtom to access the user state

  // Redirect to login page if no user is found
  return user ? children : <Navigate to="/login" replace />;
};

export default Protected;
