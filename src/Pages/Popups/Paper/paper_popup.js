// PaperPopup.js
import React, { useState, useEffect } from "react";
import "../../../Css/PaperPopup.css";
import "../../../Css/Common.css";
import axios from "axios";
import BearTag from "../../../Image/Paper/곰.svg";
import RaccoonTag from "../../../Image/Paper/너구리.svg";
import SnowmanTag from "../../../Image/Paper/눈사람.svg";
import DeerTag from "../../../Image/Paper/사슴.svg";
import RabbitTag from "../../../Image/Paper/토끼.svg";
import PenguinTag from "../../../Image/Paper/펭귄.svg";
import ShowPaper from "./show_paper.js";
import CheckDate from "./check_date.js";
import CreatePaper from "./create_paper.js";
const PaperPopup = ({ owner, onConfirm }) => {
  const access_token = localStorage.getItem("access");
  const [selected, setSelected] = useState(null);
  const [showPaper, setShowPaper] = useState(false);
  const [listData, setListData] = useState([]);
  const [checkDate, setCheckDate] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [createPaper, setCreatePaper] = useState(false);
  //페이퍼 리스트 정보 get

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/paper_list.json");
        setListData(response.data.data);
      } catch (error) {
        console.error("Error fetching rolling paper data:", error);
      }
    };
    fetchData();
  }, []);

  //날짜체크
  const handleShowPaperClick = () => {
    const currentDate = new Date();
    // Specify the allowed date (2024-01-01)
    const allowedDate = new Date("2024-01-01");

    if (currentDate < allowedDate) {
      // If the current date is before 2024-01-01, prevent opening
      setCheckDate(false);
    } else {
      setCheckDate(true);
      setShowPaper(true);
    }
  };
  //사용자 체크
  let userType;
  if (owner === true) {
    userType = "열람하기";
  } else {
    userType = "롤링페이퍼 작성하기";
  }
  //태그 디자인
  const handlePaperTagClick = (tagIndex) => {
    if (selected !== null) {
      setSelected(null);
    }
    setSelected(tagIndex);
    setSelectedDesign(listData[tagIndex].design);
  };
  const renderImages = () => {
    return listData.map((item, index) => {
      const isSelected = selected === index;
      const designValue = item.design; // Access 'design' property correctly
      return (
        <div
          className={`paper_tag ${isSelected ? "selected" : ""}`}
          key={index}
        >
          {/* 이미지를 동적으로 선택 */}
          {designValue === 1 && (
            <img
              src={PenguinTag}
              className="papertag"
              onClick={() => handlePaperTagClick(index)}
              alt={`Penguin ${index}`}
            />
          )}
          {designValue === 2 && (
            <img
              src={BearTag}
              className="papertag"
              onClick={() => handlePaperTagClick(index)}
              alt={`Bear ${index}`}
            />
          )}
          {designValue === 3 && (
            <img
              src={RabbitTag}
              className="papertag"
              onClick={() => handlePaperTagClick(index)}
              alt={`Rabbit ${index}`}
            />
          )}
          {designValue === 4 && (
            <img
              src={DeerTag}
              className="papertag"
              onClick={() => handlePaperTagClick(index)}
              alt={`Deer ${index}`}
            />
          )}
          {designValue === 5 && (
            <img
              src={SnowmanTag}
              className="papertag"
              onClick={() => handlePaperTagClick(index)}
              alt={`Snowman ${index}`}
            />
          )}
          {designValue === 6 && (
            <img
              src={RaccoonTag}
              className="papertag"
              onClick={() => handlePaperTagClick(index)}
              alt={`Raccoon ${index}`}
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="popup-overlay">
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div className="paper_popup">
          <div className="popup_back" onClick={onConfirm}>
            <img
              src={require("../../../Image/Ranking/back.png")}
              alt="receipt"
              style={{ width: "5%" }}
            />
            &emsp;이글루로 돌아가기
          </div>

          <div className="tag_container">{renderImages()}</div>

          <button
            onClick={() => {
              if (owner === true) {
                handleShowPaperClick();
              } else {
                setCreatePaper(true);
              }
            }}
            className="move_button"
          >
            {userType}
          </button>
        </div>
        {!checkDate && (
          <CheckDate
            message={
              "내가 받은 롤링페이퍼는 2024년 1월 1일부터 확인할 수 있어요!"
            }
            onConfirm={() => setCheckDate(true)}
          />
        )}
        {showPaper && (
          <ShowPaper
            design={selectedDesign}
            onConfirm={() => setShowPaper(false)}
          />
        )}
        {createPaper && (
          <CreatePaper
            design={selectedDesign}
            onConfirm={() => setCreatePaper(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PaperPopup;
