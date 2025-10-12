import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
    checkUserStatus();
  }, []);

  async function checkUserStatus() {
    try {
      const response = await axios.get("http://localhost:4000/auth/authCheck", {
        withCredentials: true,
        credentials: "include", 
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, checkUserStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
