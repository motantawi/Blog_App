import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      if (localStorage.getItem("user")) {
        setUser(JSON.parse(localStorage.getItem("user")));
      }
    } else {
      setUser(null);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
