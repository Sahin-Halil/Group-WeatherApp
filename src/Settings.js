import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [unit, setUnit] = useState("Celsius");


  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedNotifications = localStorage.getItem('notifications') === 'true';
    const savedUnit = localStorage.getItem('unit') || 'Celsius';

    setDarkMode(savedDarkMode);
    setNotifications(savedNotifications);
    setUnit(savedUnit);

  
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);


  const saveSettings = () => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('unit', unit);


    alert("Settings saved!");
  };

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  return (
    <div className="settings-container">
      {/* Navbar */}

      {/* Settings Content */}
      <h1>Settings</h1>
      <ul className="settings-list">
        {/* Dark Mode Toggle */}
        <li className="setting-item">
          <div className="setting-label">Dark Mode</div>
          <div className="setting-control">
            <input
              type="checkbox"
              className="setting-toggle"
              checked={darkMode}
              onChange={handleDarkModeChange}
            />
          </div>
        </li>

        {/* Notifications Toggle */}
        <li className="setting-item">
          <div className="setting-label">Notifications</div>
          <div className="setting-control">
            <input
              type="checkbox"
              className="setting-toggle"
              checked={notifications}
              onChange={handleNotificationsChange}
            />
          </div>
        </li>

        {/* Temperature Unit Selector */}
        <li className="setting-item">
          <div className="setting-label">Temperature Unit</div>
          <div className="setting-control">
            <select
              className="select-dropdown"
              value={unit}
              onChange={handleUnitChange}
            >
              <option value="Celsius">Celsius</option>
              <option value="Fahrenheit">Fahrenheit</option>
              <option value="Kelvin">Kelvin</option>
            </select>
          </div>
        </li>
      </ul>

      <button className="save-settings" onClick={saveSettings}>Save Settings</button>
    </div>
  );
};

export default Settings;
