import React from "react";
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
        <svg width="120" height="20" viewBox="0 0 120 20">
          {isYang ? (
            // 陽爻 - 連續的一條線
            <rect
              x="10"
              y="8"
              width="100"
              height="4"
              className="yinyang-line-svg"
              rx="2"
            />
          ) : (
            // 陰爻 - 中間斷開的兩條線
            <>
              <rect
                x="10"
                y="8"
                width="40"
                height="4"
                className="yinyang-line-svg"
                rx="2"
              />
              <rect
                x="70"
                y="8"
                width="40"
                height="4"
                className="yinyang-line-svg"
                rx="2"
              />
            </>
          )}
        </svg>
      </div>

      {/* 變卦圓點 */}
      <div className="yinyang-dot-btn" onClick={onChangingToggle}>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <circle
            cx="8"
            cy="8"
            r="6"
            className={
              isChanging
                ? "yinyang-dot-svg yinyang-dot-active"
                : "yinyang-dot-svg"
            }
          />
        </svg>
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
