import React from "react";
import "./Help.css";

const Help: React.FC = () => {
  return (
    <div className="iching-help">
      <strong>使用說明</strong>
      <div className="iching-help-lines">
        <div>點擊線條可以切換陰爻（斷線）和陽爻（實線）</div>
        <div>點擊右側圓點可以設定變爻（虛線圓=不變，實心圓=變爻）</div>
        <div>
          「隨機起卦」功能模擬傳統卜卦方式，由下至上（初爻至上爻）逐爻生成
        </div>
        <div>點擊右上角的設定圖示可以顯示或隱藏白話易經的頁碼</div>
      </div>
    </div>
  );
};

export default Help;
