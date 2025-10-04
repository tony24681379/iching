import React from "react";
import settingsIcon from "../assets/settings.svg";
import "./Settings.css";

interface SettingsProps {
  onTogglePageNumber: () => void;
  showPageNumber: boolean;
}

const Settings: React.FC<SettingsProps> = ({
  onTogglePageNumber,
  showPageNumber,
}) => {
  return (
    <div className="settings-container">
      <button className="settings-btn" onClick={onTogglePageNumber}>
        <img src={settingsIcon} alt="Settings" />
      </button>
      {showPageNumber && <span className="settings-label">頁碼已顯示</span>}
    </div>
  );
};

export default Settings;
