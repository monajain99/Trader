import React from "react";
import { demo } from "../../services/auth";


const DemoButton = ({ setAuthenticated, authenticated, isLink = false }) => {
  const handleLoginClick = async (e) => {
    await demo();
    setAuthenticated(true);
    window.location.reload(false);
  };

  if (authenticated) return null;

  if (isLink) {
    return (
      <a href="#" style={{ cursor: "pointer" }} onClick={handleLoginClick}>
        Login as Demo User
      </a>
    );
  }

  return (
    <a className="" onClick={handleLoginClick}>
      Login as a Demo User
    </a>
  );
};

export default DemoButton;
