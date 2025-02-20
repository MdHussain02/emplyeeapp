import { useAtom } from "jotai"; // Import useAtom from Jotai
import { Navigate } from "react-router-dom";
import { userState } from "../../jotai/userState"; // Import the Jotai user state atom

const Protected = ({ children }) => {
  const [user] = useAtom(userState); // Use Jotai's useAtom to access the user state
  return user ? children : <Navigate to="/" replace />;
};

export default Protected;
