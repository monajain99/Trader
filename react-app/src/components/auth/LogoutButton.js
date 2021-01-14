import React from "react";
import { logout } from "../../services/auth";

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    e.preventDefault()
    await logout();
    setAuthenticated(false);
    window.location.href='/'
  };

  return (
    <button className="demoButton" onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
