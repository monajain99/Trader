import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";

const ProfileButton = ({ user, setAuthenticated }) => {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const onLogoutClick = async () => {
    await logout().then(() => setAuthenticated(false));
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
   
      <button onClick={onLogoutClick}>
        Log Out
      </button>
          
  );
};

export default ProfileButton;
