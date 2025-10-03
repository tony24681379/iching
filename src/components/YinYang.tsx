import React from "react";
import yangSvg from "../assets/yang.svg";
import yinSvg from "../assets/yin.svg";
import dotSvg from "../assets/dot.svg";
import dotActiveSvg from "../assets/dot-active.svg";
import "./YinYang.css";

interface YinYangProps {
  isYang: boolean;
  onClick: () => void;
  index: number;
  isChanging: boolean;
  onChangingToggle: () => void;
}

const YinYang: React.FC<YinYangProps> = ({
  isYang,
  onClick,
  index,
  isChanging,
  onChangingToggle,
}) => {
  return (
    <div className="yinyang-line-row">
      {/* 陰陽爻線條 */}
      <div className="yinyang-svg-btn" onClick={onClick}>
        <img
          src={isYang ? yangSvg : yinSvg}
          alt={isYang ? "陽爻" : "陰爻"}
          width={120}
          height={20}
        />
      </div>

      {/* 變卦圓點 */}
      <div className="yinyang-dot-btn" onClick={onChangingToggle}>
        <img
          src={isChanging ? dotActiveSvg : dotSvg}
          alt={isChanging ? "變爻" : "圓點"}
          width={16}
          height={16}
        />
      </div>

      {/* 爻位標籤 */}
      <div className="yinyang-label">
        第{index + 1}爻 - {isYang ? "陽" : "陰"}
        {isChanging && <span className="changed">變</span>}
      </div>
    </div>
  );
};

export default YinYang;
