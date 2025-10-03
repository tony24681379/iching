import React from 'react';

interface YinYangProps {
  isYang: boolean;
  onClick: () => void;
  index: number;
  isChanging: boolean;
  onChangingToggle: () => void;
}

const YinYang: React.FC<YinYangProps> = ({ isYang, onClick, index, isChanging, onChangingToggle }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      margin: '8px 0',
      padding: '4px',
    }}>
      {/* 陰陽爻線條 */}
      <div
        className="yin-yang-line"
        onClick={onClick}
        style={{
          cursor: 'pointer',
          borderRadius: '4px',
          transition: 'background-color 0.2s',
          padding: '4px',
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
      </div>

      {/* 變卦圓點 */}
      <div
        onClick={onChangingToggle}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          borderRadius: '12px',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e9ecef';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <circle
            cx="8"
            cy="8"
            r="6"
            fill={isChanging ? '#dc3545' : 'none'}
            stroke="#dc3545"
            strokeWidth="2"
            strokeDasharray={isChanging ? 'none' : '2,2'}
          />
        </svg>
      </div>

      {/* 爻位標籤 */}
      <div style={{
        fontSize: '12px',
        color: '#666',
        minWidth: '80px',
        textAlign: 'left'
      }}>
        第{index + 1}爻 - {isYang ? '陽' : '陰'}
        {isChanging && <span style={{ color: '#dc3545', marginLeft: '4px' }}>變</span>}
      </div>
    </div>
  );
};

export default YinYang;