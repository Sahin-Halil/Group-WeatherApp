import React, { useState } from "react";
import "./Settings.css"; // Import the CSS file

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [unit, setUnit] = useState("Celsius");

  const handleSave = () => {
    alert("Settings Saved!");
    console.log({ darkMode, notifications, unit });
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <ul className="settings-list">
        {/* Dark Mode Toggle */}
        <li className="setting-item">
          <span className="setting-label">Dark Mode</span>
          <input
            type="checkbox"
            className="setting-toggle"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </li>

        {/* Notifications Toggle */}
        <li className="setting-item">
          <span className="setting-label">Notifications</span>
          <input
            type="checkbox"
            className="setting-toggle"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </li>

        {/* Temperature Unit Selector */}
        <li className="setting-item">
          <span className="setting-label">Temperature Unit</span>
          <select
            className="select-dropdown"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="Celsius">Celsius (°C)</option>
            <option value="Fahrenheit">Fahrenheit (°F)</option>
          </select>
        </li>
      </ul>

      {/* Save Button */}
      <button className="save-settings" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
