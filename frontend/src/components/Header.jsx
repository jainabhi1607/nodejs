import React from "react";
import { useAuth } from "../context/AuthContext"; 


function Header() {
  const {isLoggedIn} = useAuth(); 

  return (
    <>
      {isLoggedIn ? (
        <ul>
          <li><a href="/">Users</a></li>
          <li><a href="/addUser">Add User</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      ) : (
        ""
      )}
    </>
  );
}

export default Header;
