// Popup.js
import React from "react";
import "../../../Css/EditPopup.css"; // Import the CSS file
import "../../../Css/Common.css";
const CheckDate = ({ message, onConfirm }) => {
  return (
    <div className="popup-overlay">
      <div className="full_container">
        <div className="popup">
          <img
            src={require("../../../Image/Quit/Warning.png")}
            alt="receipt"
            style={{ width: "25%" }}
          />
          <div style={{ padding: "0px 25px", textAlign: "center" }}>
            {message}
          </div>
          <button onClick={onConfirm} className="confirm_button">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckDate;
