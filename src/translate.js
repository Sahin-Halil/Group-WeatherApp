// translate.js
// Stores translations and a function to fetch translated text.


const translations = {
    en: {
      settingsTitle: "Settings",
      weatherMetrics: "Weather Metrics",
      temperatureUnits: "Temperature Units",
      selectLanguage: "Select Language",
      saveSettings: "Save Settings",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      precipitation: "Precipitation",
      uvIndex: "UV Index",
      airQuality: "Air Quality",
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      activitiesTitle: "Things to do in {city}",
      noPlaces: "No places found",
      noRating: "No rating available",
      noLocation: "No location available"
    },
    fr: {
      settingsTitle: "Paramètres",
      weatherMetrics: "Métriques météo",
      temperatureUnits: "Unités de température",
      selectLanguage: "Choisir la langue",
      saveSettings: "Enregistrer",
      humidity: "Humidité",
      windSpeed: "Vitesse du vent",
      precipitation: "Précipitation",
      uvIndex: "Indice UV",
      airQuality: "Qualité de l'air",
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      activitiesTitle: "Choses à faire à {city}",
      noPlaces: "Aucun lieu trouvé",
      noRating: "Aucune note disponible",
      noLocation: "Aucun emplacement disponible"
    },
    es: {
      settingsTitle: "Configuración",
      weatherMetrics: "Métricas del clima",
      temperatureUnits: "Unidades de temperatura",
      selectLanguage: "Seleccionar idioma",
      saveSettings: "Guardar",
      humidity: "Humedad",
      windSpeed: "Velocidad del viento",
      precipitation: "Precipitación",
      uvIndex: "Índice UV",
      airQuality: "Calidad del aire",
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      activitiesTitle: "Cosas que hacer en {city}",
      noPlaces: "No se encontraron lugares",
      noRating: "No hay calificación disponible",
      noLocation: "No hay ubicación disponible"
    },
    de: {
      settingsTitle: "Einstellungen",
      weatherMetrics: "Wetterdaten",
      temperatureUnits: "Temperatureinheiten",
      selectLanguage: "Sprache auswählen",
      saveSettings: "Speichern",
      humidity: "Luftfeuchtigkeit",
      windSpeed: "Windgeschwindigkeit",
      precipitation: "Niederschlag",
      uvIndex: "UV-Index",
      airQuality: "Luftqualität",
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      activitiesTitle: "Aktivitäten in {city}",
      noPlaces: "Keine Orte gefunden",
      noRating: "Keine Bewertung verfügbar",
      noLocation: "Kein Standort verfügbar"
    }
  };
  
  export const translateText = (key, lang = 'en', variables = {}) => {
    let text = translations[lang]?.[key] || translations['en'][key] || key;
    
    Object.keys(variables).forEach(varKey => {
      text = text.replace(`{${varKey}}`, variables[varKey]);
    });
    
    return text;
  };