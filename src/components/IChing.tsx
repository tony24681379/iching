import React, { useState } from "react";

import "./IChing.css";

import Help from "./Help";

import HexagramDisplay from "./HexagramDisplay";

import ChangedHexagram from "./ChangedHexagram";
import { getHexagramInfo, getChangedHexagramInfo } from "../lib/hexagrams";

const IChing: React.FC = () => {
  // select[6] 陣列，true 為陽，false 為陰
  const [select, setSelect] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  // changingLines[6] 陣列，true 為變爻，false 為不變
  const [changingLines, setChangingLines] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

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
          Math.random() > 0.5 ? 3 : 2,
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

  const hexagramInfo = getHexagramInfo(select);
  const changedHexagramInfo = getChangedHexagramInfo(select, changingLines);

  return (
    <div className="iching-root">
      <h1 className="iching-title">易經卦象速查</h1>

      <Help />

      {hexagramInfo && (
        <HexagramDisplay
          select={select}
          changingLines={changingLines}
          hexagramInfo={hexagramInfo}
          toggleYinYang={toggleYinYang}
          toggleChangingLine={toggleChangingLine}
          generateRandomHexagram={generateRandomHexagram}
        />
      )}

      {changedHexagramInfo && changingLines.some((line) => line) && (
        <ChangedHexagram
          info={changedHexagramInfo}
          originalChangingLines={changingLines}
        />
      )}
    </div>
  );
};

export default IChing;
