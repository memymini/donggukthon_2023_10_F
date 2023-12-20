// Popup.js
import React, { useState, useEffect, useRef } from "react";
import "../../Css/QuizPopup.css"; // Import the CSS file
import QuitPopup from "./quit_popup.js";
import axios from "axios";

const IglooList = ({ owner, onConfirm }) => {
  return (
    <div className="popup-overlay">
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div className="quizpopup">
          <div className="popup_back" onClick={onConfirm}>
            <img
              src={require("../../Image/Quiz/back.png")}
              alt="receipt"
              style={{ width: "5%" }}
            />
            &emsp;퀴즈 나가기
          </div>
        </div>
      </div>
    </div>
  );
};

export default IglooList;
