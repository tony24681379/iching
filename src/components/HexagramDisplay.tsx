import React from "react";
import YinYang from "./YinYang";
import "./HexagramDisplay.css";

interface HexagramInfo {
  fullName: string;
  page?: number;
}

interface HexagramDisplayProps {
  select: boolean[];
  changingLines: boolean[];
  toggleYinYang: (index: number) => void;
  toggleChangingLine: (index: number) => void;
  generateRandomHexagram: () => void;
  hexagramInfo: HexagramInfo;
}

const HexagramDisplay: React.FC<HexagramDisplayProps> = ({
  select,
  changingLines,
  toggleYinYang,
  toggleChangingLine,
  generateRandomHexagram,
  hexagramInfo,
}) => {
  return (
    <div className="iching-panel">
      <div className="iching-panel-header">
        <h3 className="iching-panel-header-title">起卦</h3>
      </div>
      <div className="iching-lines">
        {[...select].map((_, i) => {
          const idx = select.length - 1 - i;
          const indexForDisplay = i;
          return (
            <YinYang
              key={idx}
              isYang={select[idx]}
              onClick={() => toggleYinYang(idx)}
              index={indexForDisplay}
              isChanging={changingLines[idx]}
              onChangingToggle={() => toggleChangingLine(idx)}
            />
          );
        })}
      </div>
      <div className="iching-random-btn-row">
        <button className="iching-random-btn" onClick={generateRandomHexagram}>
          隨機起卦
        </button>
      </div>
      <div className="iching-info-main">
        <p className="hexagram-result">
          {hexagramInfo.fullName}
          <br />
          <span className="iching-info-page">頁數：{hexagramInfo.page}</span>
        </p>
      </div>
    </div>
  );
};

export default HexagramDisplay;
