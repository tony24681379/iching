import React from "react";
import ChangedLine from "./ChangedLine";
import "./ChangedHexagram.css";

interface ChangedHexagramInfo {
  fullName: string;
  page?: number;
  changedLines: boolean[];
}

interface ChangedHexagramProps {
  info: ChangedHexagramInfo;
  originalChangingLines: boolean[];
  showPageNumber: boolean;
}

const ChangedHexagram: React.FC<ChangedHexagramProps> = ({
  info,
  originalChangingLines,
  showPageNumber,
}) => {
  return (
    <div className="iching-changed-panel">
      <h3 className="iching-changed-title">變卦結果</h3>
      <div className="iching-changed-lines">
        {info.changedLines.map((_, i, arr) => {
          const idx = arr.length - 1 - i;
          return (
            <ChangedLine
              key={idx}
              isYang={arr[idx]}
              isChanged={originalChangingLines[idx]}
              index={i}
            />
          );
        })}
      </div>
      <div className="iching-changed-info">
        <p className="hexagram-result">
          {info.fullName}
          {showPageNumber && (
            <>
              <br />
              <span className="iching-info-page">頁數：{info.page}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default ChangedHexagram;
