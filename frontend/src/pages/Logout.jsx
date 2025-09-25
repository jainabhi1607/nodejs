import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const navigate = useNavigate();
  
useEffect(() => {
    fetchLogout();
  }, []);

  async function fetchLogout() {
    try {
      const response = await axios.get("http://localhost:4000/auth/logout", {
        withCredentials: true,
        credentials: "include", 
      });
      
      if (response.status === 200) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(true);
    } 

    if (!isAuthenticated) {
      navigate("/login");
      return null;
      }
  }
}

export default Logout