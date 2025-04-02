import React, { useState, useEffect } from "react";
import "./Activities.css";
import { Link } from "react-router-dom";

// Define your translations for different languages
const translations = {
  en: {
    activitiesNavbar: "Activities",
    weatherNavbar: "Weather",
    settingsNavbar: "Settings",
    thingsToDoTitle: "Things to do in {city}",
  },
  es: {
    activitiesNavbar: "Actividades",
    weatherNavbar: "Clima",
    settingsNavbar: "Configuración",
    thingsToDoTitle: "Cosas que hacer en {city}",
  },
  fr: {
    activitiesNavbar: "Activités",
    weatherNavbar: "Météo",
    settingsNavbar: "Paramètres",
    thingsToDoTitle: "Choses à faire à {city}",
  },
};

const Activities = ({ city }) => {
  const [places, setPlaces] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [translatedLabels, setTranslatedLabels] = useState(translations[language]);

  useEffect(() => {
    fetchPlaces(city);
    setTranslatedLabels(translations[language]); // Update labels when language changes
  }, [city, language]);

  const fetchPlaces = async (city) => {
    try {
      const response = await fetch(`http://localhost:5000/places?city=${city}`);
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const translateTitle = (text) => {
    return translatedLabels[text]?.replace("{city}", city) || text;
  };

  return (
    <div className="outer-div">
      <div className="activities-container">
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

        <h1>{translateTitle("thingsToDoTitle")}</h1> {/* Update title with translated text */}

        {places.length > 0 ? (
          <ul className="places-list">
            {places.map((place) => (
              <li key={place.name} className="place-item">
                <div className="place-info">
                  <h3>{place.name}</h3>
                  <p>Rating: {place.rating || "No rating available"}</p>
                  <p>Location: {place.area || "No location available"}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No places found.</p>
        )}
      </div>
    </div>
  );
};

export default Activities;
