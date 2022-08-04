import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Popup.css";

export const VictoryPopup = ({ victory }) => {
  const navigate = useNavigate();
  const handlePopupClick = () => {
    navigate("../");
  };
  return (
    <div className="popup-wrapper" onClick={handlePopupClick}>
      <div className="popup-box">
        <h2 className="victory-text">
          {victory === true ? "Victory!" : "Defeat!"}
        </h2>
        <h2>Click to continue</h2>
      </div>
    </div>
  );
};
