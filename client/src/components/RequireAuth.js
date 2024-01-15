import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  if (auth.user === null) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default RequireAuth;
