import React from "react";
import yangSvg from "../assets/yang.svg";
import yinSvg from "../assets/yin.svg";
import yangChangedSvg from "../assets/yang-changed.svg";
import yinChangedSvg from "../assets/yin-changed.svg";
import "./ChangedLine.css";

interface ChangedLineProps {
  isYang: boolean;
  isChanged: boolean;
  index: number;
}

const ChangedLine: React.FC<ChangedLineProps> = ({
  isYang,
  isChanged,
  index,
}) => {
  const getSvgSrc = () => {
    if (isChanged) {
      return isYang ? yangChangedSvg : yinChangedSvg;
    }
    return isYang ? yangSvg : yinSvg;
  };

  return (
    <div
      className="iching-changed-line"
      style={{ opacity: isChanged ? 1 : 0.6 }}
    >
      <div className="iching-changed-svg">
        <img
          src={getSvgSrc()}
          alt={isYang ? "陽爻" : "陰爻"}
          width={120}
          height={20}
        />
      </div>
      <div className="iching-changed-label">
        第{index + 1}爻 - {isYang ? "陽" : "陰"}
        {isChanged && <span className="changed">變</span>}
      </div>
    </div>
  );
};

export default ChangedLine;
