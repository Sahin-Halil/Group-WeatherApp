import React, { useState, useEffect } from "react";
import "./Activities.css";
import { Link } from "react-router-dom";

// Activities.js
// This component displays a list of interesting places in the selected city.
// It supports multilingual translations for labels and descriptions.

const translations = {
  // static translations for english, spanish and french
  en: {
    activitiesNavbar: "Activities",
    weatherNavbar: "Weather",
    settingsNavbar: "Settings",
    thingsToDoTitle: "Things to do in {city}",
    ratingPlaces: "Rating",
    locationOffPlaces: "Location",
    descriptionLabel: "Description",
    typeDescriptions: {
      museum: "A place to explore history and art",
      park: "A relaxing outdoor space",
      tourist_attraction: "A popular tourist attraction",
      church: "A historic religious site",
      mosque: "A peaceful place of worship",
      cafe: "A cozy place for coffee",
      restaurant: "A place to eat",
      zoo: "See animals up close",
      aquarium: "Underwater life on display",
      art_gallery: "Explore artistic works",
      amusement_park: "Exciting rides and games",
      shopping_mall: "Shop and explore",
      other: "A local place of interest"
    }
  },
  es: {
    activitiesNavbar: "Actividades",
    weatherNavbar: "Clima",
    settingsNavbar: "Configuración",
    thingsToDoTitle: "Cosas que hacer en {city}",
    ratingPlaces: "Calificación",
    locationOffPlaces: "Ubicación",
    descriptionLabel: "Descripción",
    typeDescriptions: {
      museum: "Un lugar para explorar historia y arte",
      park: "Un espacio al aire libre para relajarse",
      tourist_attraction: "Una atracción turística popular",
      church: "Un sitio religioso histórico",
      mosque: "Un lugar de oración y paz",
      cafe: "Un lugar acogedor para café",
      restaurant: "Un sitio para comer",
      zoo: "Ver animales de cerca",
      aquarium: "Vida marina en exhibición",
      art_gallery: "Explorar obras de arte",
      amusement_park: "Diversión y juegos emocionantes",
      shopping_mall: "Ir de compras y explorar",
      other: "Un sitio local interesante"
    }
  },
  fr: {
    activitiesNavbar: "Activités",
    weatherNavbar: "Météo",
    settingsNavbar: "Paramètres",
    thingsToDoTitle: "Choses à faire à {city}",
    ratingPlaces: "Évaluation",
    locationOffPlaces: "Emplacement",
    descriptionLabel: "Description",
    typeDescriptions: {
      museum: "Un endroit pour explorer l'histoire et l'art",
      park: "Un espace extérieur relaxant",
      tourist_attraction: "Une attraction touristique populaire",
      church: "Un site religieux historique",
      mosque: "Un lieu de prière paisible",
      cafe: "Un café accueillant",
      restaurant: "Un endroit pour manger",
      zoo: "Voir des animaux de près",
      aquarium: "Découvrir la vie marine",
      art_gallery: "Explorer des œuvres d'art",
      amusement_park: "Jeux et manèges amusants",
      shopping_mall: "Faire du shopping et explorer",
      other: "Un endroit local intéressant"
    }
  }
};


const Activities = ({ city }) => {
  const [places, setPlaces] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  // load saved language from LocalStorage, falls back to english
  const [translatedLabels, setTranslatedLabels] = useState(translations[language] || translations["en"]);

  // Effect to fetch places and update translations when the city or language changes
  useEffect(() => {
    fetchPlaces(city);
    setTranslatedLabels(translations[language] || translations["en"]); // Update labels when language changes
  }, [city, language]);

  // Function to fetch places from the backend API
  const fetchPlaces = async (city) => {
    try {
      const response = await fetch(`http://localhost:5000/places?city=${city}`);
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  // Function to translate the title with dynamic city replacement
  const translateTitle = (text) => {
    return translatedLabels[text]?.replace("{city}", city) || text;
  };

  // Function to get the translated description for a place type
  const getTranslatedTypeDescription = (type) => {
    return translatedLabels.typeDescriptions?.[type] || translatedLabels.typeDescriptions?.other;
  }; // fallback to 'other' if language or city changes

  return (
    <div className="outer-div">
      {/* Title for the activities page */}
      <h1 className="activities-title">{translateTitle("thingsToDoTitle")}</h1>

      {/* Container for activities and navigation */}
      <div className="activities-container">
        {/* Navbar for navigation */}
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

        {/* List of places */}
        {places.length > 0 ? (
          <ul className="places-list">
            {places.map((place) => (
              <li key={place.name} className="place-item">
                <div className="place-info">
                  <h3>{place.name}</h3>
                  <p>{translatedLabels.ratingPlaces}: {place.rating}</p>
                  <p><strong>{translatedLabels.locationOffPlaces}:</strong> {place.area}</p>
                  <p><strong>{translatedLabels.descriptionLabel}:</strong> {getTranslatedTypeDescription(place.type)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Activities;
