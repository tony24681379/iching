import React from "react";
import yangSvg from "../assets/yang.svg";
import yinSvg from "../assets/yin.svg";
import "./IChing.css";

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
  return (
    <div
      className="iching-changed-line"
      style={{ opacity: isChanged ? 1 : 0.6 }}
    >
      <div className="iching-changed-svg">
        <img
          src={isYang ? yangSvg : yinSvg}
          alt={isYang ? "陽爻" : "陰爻"}
          width={120}
          height={20}
          className={isChanged ? "changed-line-svg" : "normal-line-svg"}
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
