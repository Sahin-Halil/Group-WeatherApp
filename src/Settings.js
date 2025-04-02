import React, { useState, useEffect } from 'react';
import './Settings.css';
import { Link } from 'react-router-dom';

const Settings = ({language, setLanguage, weatherMetrics, setWeatherMetrics}) => {
  const [metrics, setMetrics] = useState(() => {
    const savedMetrics = localStorage.getItem("metrics");
    try {
      return savedMetrics ? JSON.parse(savedMetrics) : {
        precipitation: true,
        uvIndex: false,
        airQuality: false,
        windSpeed: true,
      };
    } catch (error) {
      console.error("Error parsing metrics from localStorage", error);
      return {
        precipitation: true,
        uvIndex: false,
        airQuality: false,
        windSpeed: true,
      };
    }
  });

  // Save settings to local storage whenever the metrics change
  useEffect(() => {
    try {
      localStorage.setItem('metrics', JSON.stringify(metrics));
  } catch (error) {
    console.error("Error saving metrics to localStorage:", error);
    }
  }, [metrics]);

  const handleMetricChange = (metric) => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      [metric]: !prevMetrics[metric]
    }));
  };

  const [unit, setUnit] = useState(localStorage.getItem('unit') || "Celsius");

  const [translatedLabels, setTranslatedLabels] = useState({
    settingsTitle: "Settings",
    weatherMetrics: "Weather Metrics",
    temperatureUnits: "Temperature Units",
    selectLanguage: "Select Language",
    saveSettings: "Save Settings",
    settingsNavbar: "Settings",
    weatherNavbar: "Weather",
    activitiesNavbar: "Activities",
    precipitation: "Precipitation",
    uvIndex: "UV Index",
    airQuality: "Air Quality",
    windSpeed: "Wind Speed",
  });

  const handleCheckboxChange = (e) => {
    const {name, checked} = e.target;
    setWeatherMetrics((prevMetrics) => ({
      ...prevMetrics,
      [name]: checked,
    }));
  }

  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "en";
    setLanguage(storedLang);
    translateAllLabels(storedLang); // Translate labels on mount
  }, []); // Run only once on mount

  useEffect(() => {
    translateAllLabels(language); // Re-translate when the language changes
  }, [language]);

  // TRANSLATION FUNCTION
  const translateText = async (text, targetLang) => {
    const translations = {
      en: {
        "Settings": "Settings", "Weather Metrics": "Weather Metrics", "Precipitation": "Precipitation", 
        "UV Index": "UV Index", "Air Quality": "Air Quality", 
        "Wind Speed": "Wind Speed", "Temperature Units": "Temperature Units", 
        "Select Language": "Select Language", "Save Settings": "Save Settings", 
        "Settings": "Settings", "Weather": "Weather", "Activities": "Activities"
      },
      es: {
        "Settings": "Configuración", "Weather Metrics": "Métricas del clima", "Precipitation": "Precipitación", 
        "UV Index": "Índice UV", "Air Quality": "Calidad del aire", 
        "Wind Speed": "Velocidad del viento", "Temperature Units": "Unidades de temperatura", 
        "Select Language": "Seleccionar idioma", "Save Settings": "Guardar configuración", 
        "Settings": "Configuración", "Weather": "Clima", "Activities": "Actividades"
      },
      fr: {
        "Settings": "Paramètres", "Weather Metrics": "Métriques météorologiques", "Precipitation": "Précipitation", 
        "UV Index": "Indice UV", "Air Quality": "Qualité de l'air", 
        "Wind Speed": "Vitesse du vent", "Temperature Units": "Unités de température", 
        "Select Language": "Sélectionner la langue", "Save Settings": "Enregistrer les paramètres", 
        "Settings": "Paramètres", "Weather": "Météo", "Activities": "Activités"
      }
    };

    return translations[targetLang]?.[text] || text;
  };

  const translateAllLabels = async (targetLang) => {
    const labels = {
      settingsTitle: "Settings",
      weatherMetrics: "Weather Metrics",
      precipitation: "Precipitation",
      uvIndex: "UV Index",
      temperature: "Temperature",
      airQuality: "Air Quality",
      windSpeed: "Wind Speed",
      temperatureUnits: "Temperature Units",
      selectLanguage: "Select Language",
      saveSettings: "Save Settings",
      settingsNavbar: "Settings",
      weatherNavbar: "Weather",
      activitiesNavbar: "Activities"
    };

    const translatedEntries = await Promise.all(
      Object.entries(labels).map(async ([key, value]) => {
        const translatedValue = await translateText(value, targetLang);
        return [key, translatedValue];
      })
    );

    const translatedLabels = Object.fromEntries(translatedEntries);
    setTranslatedLabels(translatedLabels);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const saveSettings = () => {
    setWeatherMetrics(metrics);
    localStorage.setItem('metrics', JSON.stringify(metrics));
    localStorage.setItem('unit', unit);
    alert("Settings Changes have been saved.")
  }

  const metricsKeys = metrics && Object.keys(metrics);

  const handleLanguageChange = (newLang) => {
    console.log("Language changed to:", newLang);
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    translateAllLabels(newLang);
  };

  return (
    <div className="outer-div">
      <div className="settings-container">
        <div className="navbar">
          <Link to="/Activities" className="nav-button">
            <img src="/activities-icon.png" alt="activities icon" />
            {translatedLabels.activitiesNavbar}
          </Link>
          <Link to="/Weather" className="nav-button">
            <img src="/weather-icon.png" alt="weather icon" />
            {translatedLabels.weatherNavbar}
          </Link>
          <Link to="/Settings" className="nav-button">
            <img src="/settings-icon.png" alt="settings icon" />
            {translatedLabels.settingsNavbar}
          </Link>
        </div>

        <h1>{translatedLabels.settingsTitle}</h1>

        <div className="settings-section">
          <h2>{translatedLabels.weatherMetrics}</h2>
          {/* Only try to render metrics if it's a valid object and contains keys */}
          {metrics && metricsKeys && metricsKeys.length > 0 ? (
            metricsKeys.map((metric) => (
              <label key={metric} className="setting-item">
                <span className="setting-label">{metric.charAt(0).toUpperCase() + metric.slice(1)}</span>
                <input
                  type="checkbox"
                  checked={metrics[metric]}
                  onChange={() => handleMetricChange(metric)}
                />
              </label>
            ))
          ) : (
            <p>No metrics available.</p>
          )}
        </div>

        <div className="settings-section">
          <h2>{translatedLabels.temperatureUnits}</h2>
          <label className="setting-item" id="celsius">
            <input
              type="radio"
              value="Celsius"
              checked={unit === "Celsius"}
              onChange={handleUnitChange}
            />
            Celsius
          </label>
          <label className="setting-item" id="fahrenheit">
            <input
              type="radio"
              value="Fahrenheit"
              checked={unit === "Fahrenheit"}
              onChange={handleUnitChange}
            />
            Fahrenheit
          </label>
        </div>

        <div className="settings-section">
          <h2>{translatedLabels.selectLanguage}</h2>
          <select value={language} onChange={(e) => handleLanguageChange(e.target.value)} className="language-dropdown">
            <option value="en">🇬🇧 English</option>
            <option value="es">🇪🇸 Español</option>
            <option value="fr">🇫🇷 Français</option>
          </select>
        </div>

        <button className="save-settings" onClick={saveSettings}>
          {translatedLabels.saveSettings}
        </button>
      </div>
    </div>
  );
};

export default Settings;