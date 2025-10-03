import React from 'react';

interface YinYangProps {
  isYang: boolean;
  onClick: () => void;
  index: number;
}

const YinYang: React.FC<YinYangProps> = ({ isYang, onClick, index }) => {
  return (
    <div
      className="yin-yang-line"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        margin: '8px 0',
        padding: '4px',
        borderRadius: '4px',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f0f0f0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <svg width="120" height="20" viewBox="0 0 120 20">
        {isYang ? (
          // 陽爻 - 連續的一條線
          <rect
            x="10"
            y="8"
            width="100"
            height="4"
            fill="#2c3e50"
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
              fill="#2c3e50"
              rx="2"
            />
            <rect
              x="70"
              y="8"
              width="40"
              height="4"
              fill="#2c3e50"
              rx="2"
            />
          </>
        )}
      </svg>
      <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '4px', color: '#666' }}>
        第{index + 1}爻 - {isYang ? '陽' : '陰'}
      </div>
    </div>
  );
};

export default YinYang;