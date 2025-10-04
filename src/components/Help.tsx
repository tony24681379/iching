import React from "react";
import "./Help.css";

const Help: React.FC = () => {
  return (
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
  );
};

export default Help;
