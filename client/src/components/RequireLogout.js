import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const RequireLogout = ({ children }) => {
  const auth = useAuth();

  if (auth.user !== null) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RequireLogout;
