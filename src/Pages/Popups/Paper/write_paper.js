import React, { useState, useEffect } from "react";
import "../../../Css/WritePaper.css";
import "../../../Css/Common.css";
import axios from "axios";
import BearP from "../../../Image/Paper/곰p.png";
import RaccoonP from "../../../Image/Paper/너구리p.png";
import SnowmanP from "../../../Image/Paper/눈사람p.png";
import DeerP from "../../../Image/Paper/사슴p.png";
import RabbitP from "../../../Image/Paper/토끼p.png";
import PenguinP from "../../../Image/Paper/펭귄p.png";
import QuitPopup from "../../../Pages/Popups/quit_popup.js";
import EditPopup from "../../../Pages/Popups/edit_popup.js";

const WritePaper = ({ design, onConfirm }) => {
  const [showQuit, setShowQuit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [text, setText] = useState("");
  const [paperState, setPaperState] = useState("");
  const paperDesign = design;

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleWritePaper = () => {
    //수정
    if (text) {
      axios
        .patch(`/paper.json`, { content: text })
        .then((response) => {
          if (response.data.code === 204) {
            console.log(response.data.contents);
            setPaperState("롤링페이퍼 수정이 완료되었어요!");
            setShowConfirm(true);
          } else if (response.data.code === 400) {
            alert(response.data.message);
          } else if (response.data.code === 401) {
            alert(response.data.message);
          } else if (response.data.code === 409) {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error updating paper:", error);
        }); // 처음 쓰기
    } else {
      axios
        .post("/paper.json", {
          userId: 3,
          content: text,
          design: paperDesign,
        })
        .then((response) => {
          if (response.code === 201) {
            console.log(response.contents);
            setPaperState("롤링페이퍼 작성이 완료되었어요!");
            setShowConfirm(true);
          } else if (response.data.code === 400) {
            alert(response.message);
          } else if (response.data.code === 401) {
            alert(response.message);
          } else if (response.data.code === 409) {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error saving paper:", error);
        });
    }
  };

  let designURL;
  switch (design) {
    case 1:
      designURL = PenguinP;
      break;
    case 2:
      designURL = BearP;
      break;
    case 3:
      designURL = RabbitP;
      break;
    case 4:
      designURL = DeerP;
      break;
    case 5:
      designURL = SnowmanP;
      break;
    case 6:
      designURL = RaccoonP;
      break;
  }

  const handleDeleteClick = () => {
    // Show quit popup when delete is clicked
    setShowQuit(true);
  };
  return (
    <div className="popup-overlay">
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div className="show_paper">
          <div className="popup_back" onClick={onConfirm}>
            <img
              src={require("../../../Image/Ranking/back.png")}
              alt="receipt"
              style={{ width: "5%" }}
            />
            &emsp;이글루로 돌아가기
          </div>
          <form method="post">
            <div className="container">
              <div
                className="showPaper"
                style={{ backgroundImage: `url(${designURL})` }}
                alt="design"
              >
                <textarea
                  className="paper_content_write"
                  value={text}
                  onChange={handleTextChange}
                  rows="15"
                  cols="50"
                  style={{
                    border: "none",
                    outline: "none",
                    background: "none",
                    resize: "none",
                  }}
                >
                  {text}
                </textarea>
              </div>
            </div>

            <div className="button_container">
              <input
                value="삭제"
                type="reset"
                className="button_paperwrite"
                onClick={handleDeleteClick}
              />
              <input
                value="확인"
                type="submit"
                className="button_paperwrite"
                onClick={handleWritePaper}
              />
            </div>
          </form>
          {showQuit && (
            <QuitPopup
              message="이 페이지를 벗어나면 마지막 저장 후
수정된 내용은 저장되지 않아요!"
              onQuit={() => {
                setShowQuit(false);
                setShowConfirm(true); // 이 부분에서 EditPopup을 나오게 설정
              }}
              onConfirm_q={() => {
                setShowQuit(false);
              }}
            />
          )}
          {showConfirm && (
            <EditPopup
              message={paperState}
              onConfirm={() => {
                setShowConfirm(false);
              }}
              onCancel={() => {
                setShowConfirm(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WritePaper;
