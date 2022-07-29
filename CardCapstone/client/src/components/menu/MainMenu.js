import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./MainMenu.css";
import { logout } from "../../modules/authManager";

export const MainMenu = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleButtonClick = (evt) => {
    if (evt.target.value != "/logout") {
      navigate(evt.target.value);
    } else {
      logout();
    }
  };

  return (
    <div className="menu-container">
      <h1 className="ui-title">WebStone</h1>
      <div className="ui-container">
        <button className="menu-btn" onClick={handleButtonClick} value="/play">
          Play
        </button>
        <button
          className="menu-btn"
          onClick={handleButtonClick}
          value="/collection"
        >
          Collection
        </button>
        {isLoggedIn ? (
          <button
            className="menu-btn"
            onClick={handleButtonClick}
            value="/logout"
          >
            Logout
          </button>
        ) : (
          <button
            className="menu-btn"
            onClick={handleButtonClick}
            value="/login"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};
