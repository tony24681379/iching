import React, { useState } from 'react';
import YinYang from './YinYang';
import './IChing.css';

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

  // changingLines[6] 陣列，true 為變爻，false 為不變
  const [changingLines, setChangingLines] = useState<boolean[]>([false, false, false, false, false, false]);

  // 點擊切換陰陽的函數
  const toggleYinYang = (index: number) => {
    const newSelect = [...select];
    newSelect[index] = !newSelect[index];
    setSelect(newSelect);
  };

  // 切換變爻狀態的函數
  const toggleChangingLine = (index: number) => {
    const newChangingLines = [...changingLines];
    newChangingLines[index] = !newChangingLines[index];
    setChangingLines(newChangingLines);
  };

  // 隨機生成卦象（依三枚硬幣法，分少陰、少陽、老陰、老陽）
  // 三枚硬幣規則：
  // 正面3分，反面2分，三枚總和只會是 6、7、8、9
  // 6分（全反）：老陰（陰、變）
  // 7分（一正兩反）：少陰（陰、不變）
  // 8分（兩正一反）：少陽（陽、不變）
  // 9分（全正）：老陽（陽、變）
  // 產生時若不是這四種分數則重丟，確保每一爻都正確
  const generateRandomHexagram = () => {
    const newSelect: boolean[] = [];
    const newChangingLines: boolean[] = [];
    for (let i = 0; i < 6; i++) {
      let sum = 0;
      while (![6, 7, 8, 9].includes(sum)) {
        const coins = [
          Math.random() > 0.5 ? 3 : 2,
          Math.random() > 0.5 ? 3 : 2,
          Math.random() > 0.5 ? 3 : 2
        ];
        sum = coins[0] + coins[1] + coins[2];
      }
      console.log(`第${i + 1}爻分數:`, sum);
      if (sum === 6) {
        // 老陰：陰爻且變爻
        newSelect.push(false);
        newChangingLines.push(true);
      } else if (sum === 7) {
        // 少陰：陰爻不變
        newSelect.push(false);
        newChangingLines.push(false);
      } else if (sum === 8) {
        // 少陽：陽爻不變
        newSelect.push(true);
        newChangingLines.push(false);
      } else if (sum === 9) {
        // 老陽：陽爻且變爻
        newSelect.push(true);
        newChangingLines.push(true);
      }
    }
    console.log(newSelect, newChangingLines);
    setSelect(newSelect.reverse());
    setChangingLines(newChangingLines.reverse());
  };

  // 將布林陣列轉換為卦象名稱
  const getHexagramInfo = () => {
    // 將陣列反轉，因為易經爻序是從下到上（第一爻在下，第六爻在上）
    // 但我們的陣列索引是從上到下的
    const reversedSelect = [...select];
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
  };

  // 計算變卦結果
  const getChangedHexagramInfo = () => {
    // 如果沒有變爻，返回 null
    const hasChangingLines = changingLines.some(line => line);
    if (!hasChangingLines) {
      return null;
    }

    // 計算變卦：變爻的陰陽會顛倒
    const changedSelect = select.map((value, index) =>
      changingLines[index] ? !value : value
    );

    // 將陣列反轉，因為易經爻序是從下到上
    const reversedChangedSelect = [...changedSelect].reverse();
    const binaryString = reversedChangedSelect.map(val => val ? '1' : '0').join('');

    // 從映射表中查找對應的卦象編號
    const hexagramNumber = hexagramMapping[binaryString];

    if (hexagramNumber) {
      const hexagramIndex = hexagramNumber - 1;
      return {
        binary: binaryString,
        decimal: hexagramNumber,
        index: hexagramIndex,
        name: hexagramNames[hexagramIndex],
        fullName: `第 ${hexagramNumber} 卦 - ${hexagramNames[hexagramIndex]}`,
        isValid: true,
        changedLines: changedSelect
      };
    } else {
      return {
        binary: binaryString,
        decimal: 0,
        index: -1,
        name: '未知',
        fullName: `未知變卦 (${binaryString})`,
        isValid: false,
        changedLines: changedSelect
      };
    }
  };

  const hexagramInfo = getHexagramInfo();
  const changedHexagramInfo = getChangedHexagramInfo();

  return (
    <div className="iching-root">
      <h1 className="iching-title">易經卦象速查</h1>

      <div className="iching-panel">
        <div className="iching-panel-header">
          <h3 className="iching-panel-header-title">點擊下方線條來改變陰陽</h3>
        </div>
        <div className="iching-lines">
          {[...select].map((_, i) => {
            const idx = select.length - 1 - i;
            // indexForDisplay: 6~1
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
          <button className="iching-random-btn" onClick={generateRandomHexagram}>隨機卦象</button>
        </div>
        <div className="iching-info-main" style={{ marginTop: '20px', textAlign: 'center' }}>
          <p className={`iching-info-name ${hexagramInfo.isValid ? 'valid' : 'invalid'}`}>{hexagramInfo.fullName}</p>
          {hexagramInfo.isValid ? null : (
            <p className="iching-info-warn">⚠️ 此組合不對應傳統易經卦象</p>
          )}
        </div>
      </div>

      {changedHexagramInfo && (
        <React.Fragment>
          <div className="iching-changed-panel">
            <h4 className="iching-changed-title">變卦結果</h4>
            <div className="iching-changed-lines">
              {changedHexagramInfo.changedLines?.map((isYang, index) => (
                <div key={index} className="iching-changed-line" style={{ opacity: changingLines[index] ? 1 : 0.6 }}>
                  <div className="iching-changed-svg">
                    <svg width="120" height="20" viewBox="0 0 120 20">
                      {isYang ? (
                        <rect
                          x="10"
                          y="8"
                          width="100"
                          height="4"
                          className={changingLines[index] ? 'changed-line-svg' : 'normal-line-svg'}
                          rx="2"
                        />
                      ) : (
                        <React.Fragment>
                          <rect
                            x="10"
                            y="8"
                            width="40"
                            height="4"
                            className={changingLines[index] ? 'changed-line-svg' : 'normal-line-svg'}
                            rx="2"
                          />
                          <rect
                            x="70"
                            y="8"
                            width="40"
                            height="4"
                            className={changingLines[index] ? 'changed-line-svg' : 'normal-line-svg'}
                            rx="2"
                          />
                        </React.Fragment>
                      )}
                    </svg>
                  </div>
                  <div className="iching-changed-label">
                    第{index + 1}爻 - {isYang ? '陽' : '陰'}
                    {changingLines[index] && <span className="changed">變</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="iching-changed-info">
              <p className="iching-changed-name">{changedHexagramInfo.fullName}</p>
              <p className="iching-changed-pos">
                變爻位置：{changingLines.map((isChanging, index) =>
                  isChanging ? `第${index + 1}爻` : null
                ).filter(Boolean).join('、')}
              </p>
            </div>
          </div>
        </React.Fragment>
      )}

      <div className="iching-help">
        <strong>使用說明</strong>
        <div className="iching-help-lines">
          <div>每個卦象由6個爻組成（從下到上：第1爻到第6爻）</div>
          <div>點擊線條可以切換陰爻（斷線）和陽爻（實線）</div>
          <div>點擊右側圓點可以設定變爻（虛線圓=不變，實心圓=變爻）</div>
          <div>變爻會使該爻的陰陽顛倒，形成變卦</div>
          <div>共有 64 種可能的卦象組合</div>
        </div>
      </div>
    </div>
  );
};

export default IChing;