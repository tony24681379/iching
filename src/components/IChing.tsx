import React, { useState } from 'react';
import YinYang from './YinYang';

const IChing: React.FC = () => {
  // 64 卦象名稱陣列（按照傳統編號順序）
  const hexagramNames = [
    '乾', '坤', '屯', '蒙', '需', '訟', '師', '比',
    '小畜', '履', '泰', '否', '同人', '大有', '謙', '豫',
    '隨', '蠱', '臨', '觀', '噬嗑', '賁', '剝', '復',
    '無妄', '大畜', '頤', '大過', '坎', '離', '咸', '恆',
    '遯', '大壯', '晉', '明夷', '家人', '睽', '蹇', '解',
    '損', '益', '夬', '姤', '萃', '升', '困', '井',
    '革', '鼎', '震', '艮', '漸', '歸妹', '豐', '旅',
    '巽', '兌', '渙', '節', '中孚', '小過', '既濟', '未濟'
  ];

  // 建立六爻組合到卦象編號的映射表
  // 格式: "從下到上六爻的二進位字串" -> 卦象編號(1-64)
  const hexagramMapping: { [key: string]: number } = {
    '111111': 1,  // 乾為天 ☰☰
    '000000': 2,  // 坤為地 ☷☷
    '010001': 3,  // 水雷屯 ☵☳
    '100010': 4,  // 山水蒙 ☶☵
    '111010': 5,  // 水天需 ☵☰
    '010111': 6,  // 天水訟 ☰☵
    '000010': 7,  // 地水師 ☷☵
    '010000': 8,  // 水地比 ☵☷
    '111011': 9,  // 風天小畜 ☴☰
    '110111': 10, // 天澤履 ☰☱
    '000111': 11, // 地天泰 ☷☰
    '111000': 12, // 天地否 ☰☷
    '111101': 13, // 天火同人 ☰☲
    '101111': 14, // 火天大有 ☲☰
    '000100': 15, // 地山謙 ☷☶
    '001000': 16, // 雷地豫 ☳☷
    '011001': 17, // 澤雷隨 ☱☳
    '100110': 18, // 山風蠱 ☶☴
    '000011': 19, // 地澤臨 ☷☱
    '110000': 20, // 風地觀 ☴☷
    '101001': 21, // 火雷噬嗑 ☲☳
    '100101': 22, // 山火賁 ☶☲
    '100000': 23, // 山地剝 ☶☷
    '000001': 24, // 地雷復 ☷☳
    '111001': 25, // 天雷無妄 ☰☳
    '100111': 26, // 山天大畜 ☶☰
    '100001': 27, // 山雷頤 ☶☳
    '011110': 28, // 澤風大過 ☱☴
    '010010': 29, // 坎為水 ☵☵
    '101101': 30, // 離為火 ☲☲
    '011100': 31, // 澤山咸 ☱☶
    '001110': 32, // 雷風恆 ☳☴
    '111100': 33, // 天山遯 ☰☶
    '001111': 34, // 雷天大壯 ☳☰
    '101000': 35, // 火地晉 ☲☷
    '000101': 36, // 地火明夷 ☷☲
    '110101': 37, // 風火家人 ☴☲
    '101011': 38, // 火澤睽 ☲☱
    '010100': 39, // 水山蹇 ☵☶
    '001010': 40, // 雷水解 ☳☵
    '100011': 41, // 山澤損 ☶☱
    '110001': 42, // 風雷益 ☴☳
    '011111': 43, // 澤天夬 ☱☰
    '111110': 44, // 天風姤 ☰☴
    '011000': 45, // 澤地萃 ☱☷
    '000110': 46, // 地風升 ☷☴
    '011010': 47, // 澤水困 ☱☵
    '010110': 48, // 水風井 ☵☴
    '011101': 49, // 澤火革 ☱☲
    '101110': 50, // 火風鼎 ☲☴
    '001001': 51, // 震為雷 ☳☳
    '100100': 52, // 艮為山 ☶☶
    '110100': 53, // 風山漸 ☴☶
    '001011': 54, // 雷澤歸妹 ☳☱
    '001101': 55, // 雷火豐 ☳☲
    '101100': 56, // 火山旅 ☲☶
    '110110': 57, // 巽為風 ☴☴
    '011011': 58, // 兌為澤 ☱☱
    '110010': 59, // 風水渙 ☴☵
    '010011': 60, // 水澤節 ☵☱
    '110011': 61, // 風澤中孚 ☴☱
    '001100': 62, // 雷山小過 ☳☶  // 修正：小過卦應該是 001100
    '010101': 63, // 水火既濟 ☵☲
    '101010': 64  // 火水未濟 ☲☵
  };

  // select[6] 陣列，true 為陽，false 為陰
  const [select, setSelect] = useState<boolean[]>([true, true, true, false, false, false]);

  // 點擊切換陰陽的函數
  const toggleYinYang = (index: number) => {
    const newSelect = [...select];
    newSelect[index] = !newSelect[index];
    setSelect(newSelect);
  };

  // 隨機生成卦象
  const generateRandomHexagram = () => {
    const randomSelect = Array.from({ length: 6 }, () => Math.random() > 0.5);
    setSelect(randomSelect);
  };

  // 將布林陣列轉換為卦象名稱
  const getHexagramInfo = () => {
    // 將陣列反轉，因為易經爻序是從下到上（第一爻在下，第六爻在上）
    // 但我們的陣列索引是從上到下的
    const reversedSelect = [...select].reverse();
    const binaryString = reversedSelect.map(val => val ? '1' : '0').join('');

    // 從映射表中查找對應的卦象編號
    const hexagramNumber = hexagramMapping[binaryString];

    if (hexagramNumber) {
      const hexagramIndex = hexagramNumber - 1; // 陣列索引從0開始
      return {
        binary: binaryString,
        decimal: hexagramNumber,
        index: hexagramIndex,
        name: hexagramNames[hexagramIndex],
        fullName: `第 ${hexagramNumber} 卦 - ${hexagramNames[hexagramIndex]}`,
        isValid: true
      };
    } else {
      // 如果沒有找到對應的卦象，顯示錯誤資訊
      return {
        binary: binaryString,
        decimal: 0,
        index: -1,
        name: '未知',
        fullName: `未知卦象 (${binaryString})`,
        isValid: false
      };
    }
  };  const hexagramInfo = getHexagramInfo();

  return (
    <div style={{
      padding: '40px',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '30px'
      }}>
        易經卦象生成器
      </h1>

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#495057', margin: '0' }}>
            點擊下方線條來改變陰陽
          </h3>
          <button
            onClick={generateRandomHexagram}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#007bff';
            }}
          >
            隨機卦象
          </button>
        </div>

        {/* 從上到下顯示六爻，按照傳統易經順序 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column-reverse', // 反轉順序，讓第一爻在下方
          alignItems: 'center',
          gap: '4px'
        }}>
          {select.map((isYang, index) => (
            <YinYang
              key={index}
              isYang={isYang}
              onClick={() => toggleYinYang(index)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* 卦象資訊 */}
      <div style={{
        backgroundColor: '#e9ecef',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#495057', marginBottom: '15px' }}>
          當前卦象資訊
        </h3>
        <div style={{ fontSize: '18px', lineHeight: '1.8' }}>
          <p style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: hexagramInfo.isValid ? '#2c3e50' : '#dc3545',
            marginBottom: '15px'
          }}>
            {hexagramInfo.fullName}
          </p>
          {hexagramInfo.isValid ? (
            <>
              <p><strong>卦象編號：</strong>{hexagramInfo.decimal}/64</p>
              <p><strong>二進位：</strong>{hexagramInfo.binary}</p>
              <p><strong>陣列狀態：</strong>[{select.map(val => val.toString()).join(', ')}]</p>
            </>
          ) : (
            <>
              <p style={{ color: '#dc3545' }}>⚠️ 此組合不對應傳統易經卦象</p>
              <p><strong>二進位：</strong>{hexagramInfo.binary}</p>
              <p><strong>陣列狀態：</strong>[{select.map(val => val.toString()).join(', ')}]</p>
            </>
          )}
        </div>
      </div>

      {/* 使用說明 */}
      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#d1ecf1',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#0c5460'
      }}>
        <strong>使用說明：</strong>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>每個卦象由6個爻組成（從下到上：第1爻到第6爻）</li>
          <li>點擊線條可以切換陰爻（斷線）和陽爻（實線）</li>
          <li>true = 陽爻，false = 陰爻</li>
          <li>共有 64 種可能的卦象組合</li>
        </ul>
      </div>
    </div>
  );
};

export default IChing;