import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import Settings from "./Settings";
import { Link } from "react-router-dom";

// Weather.js
// Main weather component with API calls, location handling, metrics display, forecast, translation, and map integration


// Import Leaflet for map functionality
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

// Import icons for different weather conditions
import ClearDay from "./weather-icons/sun.png";
import CloudyDay from "./weather-icons/cloudy-day.png";
import Rain from "./weather-icons/rain.png";
import Snow from "./weather-icons/snow.png";
import ClearNight from "./weather-icons/clear-night.png";
import CloudyNight from "./weather-icons/cloudy-night.png";

// Create the marker icon for the map
const customMarker = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Weather = ({ city, setCity, weatherData, setWeatherData, forecastData, setForecastData }) => {
  // State variables for managing weather data, user preferences, and metrics
  const [coordinates, setCoordinates] = useState({ lat: 51.5074, lon: -0.1278 }); // defaults to London
  const [marker, setMarker] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "Celsius");
  const [weatherMetrics, setWeatherMetrics] = useState({
    precipitation: true,
    uvIndex: false,
    airQuality: false,
    windSpeed: true
  });

  // Define state for language
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "en");
  }, []);

  // Translation function
  const [translatedLabels, setTranslatedLabels] = useState({
    searchPlaceholder: "Enter city name",
    settingsNavbar: "Settings",
    weatherNavbar: "Weather",
    activitiesNavbar: "Activities",
  });

  useEffect(() => {
    translateAllLabels(language);
  }, [language]);

  // Function to translate individual text based on the selected language
  const translateText = async (text, targetLang) => {
    const translations = {
      en: { "Enter city name": "Enter city name", "Settings": "Settings", "Weather": "Weather", "Activities": "Activities" },
      es: { "Enter city name": "Ingrese el nombre de la ciudad", "Settings": "Configuración", "Weather": "Clima", "Activities": "Actividades" },
      fr: { "Enter city name": "Entrez le nom de la ville", "Settings": "Paramètres", "Weather": "Météo", "Activities": "Activités" }
    };
    return translations[targetLang]?.[text] || text;
  };

  // Function to translate all UI labels
  const translateAllLabels = async (targetLang) => {
    const labels = {
      searchPlaceholder: "Enter city name",
      settingsNavbar: "Settings",
      weatherNavbar: "Weather",
      activitiesNavbar: "Activities",
    };

    const translatedEntries = await Promise.all(
      Object.entries(labels).map(async ([key, value]) => {
        const translatedValue = await translateText(value, targetLang);
        return [key, translatedValue];
      })
    );

    const translatedLabels = Object.fromEntries(translatedEntries);
    setTranslatedLabels(translatedLabels);
  }

  // Effect to load saved unit and metrics preferences from localStorage
  useEffect(() => {
    const savedUnit = localStorage.getItem("unit") || "Celsius";
    setUnit(savedUnit);

    const savedMetrics = JSON.parse(localStorage.getItem("metrics")) || {
      precipitation: true,
      uvIndex: true,
      airQuality: false,
      windSpeed: true
    };

    setWeatherMetrics(savedMetrics);
  }, [unit]);

  // Utility functions for temperature and wind speed conversions
  const convertTemperature = (temp) => {
    return unit === "Celsius" ? Math.round(temp) : Math.round((temp * 9) / 5 + 32);
  }

  const convertWindSpeed = (speed) => {
    return unit === "Celsius" ? speed : (speed * 0.621371).toFixed(1);
  }

  // Effect to fetch user's location if no weather data is available
  useEffect(() => {
    if (!weatherData) {
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    // Re-fetch air quality data if air quality metric is enabled
    if (weatherMetrics.airQuality && weatherData) {
      const fetchAirQuality = async () => {
        try {
          const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}`;
          const airQualityResponse = await axios.get(airQualityUrl);
          if (airQualityResponse.data) {
            console.log("Air quality: ", airQualityResponse.data);
            setAirQualityData(airQualityResponse.data);
          }
        } catch (error) {
          console.error("Error fetching air quality data:", error);
        }
      };
  
      fetchAirQuality();
    }
  }, [weatherMetrics.airQuality, coordinates, weatherData]);

  // Effect to fetch UV index data when the metric is enabled
  useEffect(() => {
    if (weatherMetrics.uvIndex && coordinates.lat && coordinates.lon) {
      const fetchUvIndex = async () => {
        try {
          const uviUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}`;
          const uviResponse = await axios.get(uviUrl);
          if (uviResponse.data) {
            console.log("UV Index: ", uviResponse.data);
            setUvIndex(uviResponse.data.value);
          }
        } catch (error) {
          console.error("Error fetching UV Index data:", error);
        }
      };
      fetchUvIndex();
    } else {
      setUvIndex(null);
    }
  }, [weatherMetrics.uvIndex, coordinates]);

  // Handle fetching weather data and updating coordinates
  const fetchWeather = async (location, lat = null, lon = null) => {
    try {
      let weatherUrl;
      let forecastUrl;
      let airQualityUrl;
      let uviUrl;
  
      // If lat/lon is available, construct URLs using coordinates
      if (lat && lon) {        
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        uviUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      } else {
        // Default to city-based request if lat/lon is not available
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`;
        airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?q=${location}&appid=${API_KEY}`;
        uviUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      }
  
      // Fetch the weather data for the location
      const weatherResponse = await axios.get(weatherUrl);
      if (weatherResponse.data) {
        setWeatherData(weatherResponse.data);
        setCity(weatherResponse.data.name);
  
        // Extract lat and lon from weather data if available
        const lat = weatherResponse.data.coord.lat;
        const lon = weatherResponse.data.coord.lon;
        setCoordinates({ lat, lon });
  
        // Now, ensure lat/lon are defined before making the UV API request
        if (lat && lon) {
          const uviResponse = await axios.get(uviUrl);  // Fetch UV Index data
                  
          if (uviResponse.data) {
            const uvValue = uviResponse.data.value;
            console.log("UV Index:", uvValue);
            setUvIndex(uvValue);
          }
        } else {
          console.error("Unable to fetch UV data, lat/lon are not defined");
        }
      } else {
        console.error("No weather data found for the specified location.");
      }
  
      // Fetch air quality data
      const airQualityResponse = await axios.get(airQualityUrl);
      if (airQualityResponse.data) {
        setAirQualityData(airQualityResponse.data);
      }
  
      // Fetch the forecast data
      const forecastResponse = await axios.get(forecastUrl);
      if (forecastResponse.data) {
        const hourlyForecast = forecastResponse.data.list.filter((entry, index) => index < 5);
        setForecastData(hourlyForecast);
      }
  
    } catch (error) {
      console.error("Error fetching weather data:", error);
      if (error.response && error.response.status === 404) {
        alert("City not found. Please enter a valid city.");
      } else {
        console.error("An error occurred while fetching weather data. Please try again later.");
      }
    }
  };
  
  

  // Get user's geolocation or fallback to default city
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(null, latitude, longitude);
          setCoordinates({ lat: latitude, lon: longitude });
        },
        () => {
          alert("Location access denied. Using default city: London.");
          fetchWeather("London");
          setCoordinates({ lat: 51.5074, lon: -0.1278 });
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      fetchWeather("London");
      setCoordinates({ lat: 51.5074, lon: -0.1278 });
    }
  };

  // Function to handle city search
  const handleSearch = () => {
    if (!city.trim()) {
      alert("Please enter a valid city.");
      return;
    }
    fetchWeather(city);
  };

  // Function to fetch weather icons based on icon codes
  const fetchWeatherIcon = (iconCode) => {
    const icons = {
      "01d": ClearDay,
      "02d": CloudyDay,
      "03d": CloudyDay,
      "04d": CloudyDay,
      "09d": Rain,
      "13d": Snow,
      "01n": ClearNight,
      "02n": CloudyNight,
      "03n": CloudyNight,
      "04n": CloudyNight,
      "09n": Rain,
      "13n": Snow,
    };
    return icons[iconCode] || ClearDay;
  };

  // Custom hook to center the map when coordinates change
  const RecenterMap = () => {
    const map = useMap(); // Access the map instance
    useEffect(() => {
      if (coordinates.lat && coordinates.lon) {
        map.setView([coordinates.lat, coordinates.lon], 10); // Recenter map when coordinates change
      }
    }, [coordinates, map]); // Only run when coordinates change
    return null;
  };

  return (
    <div className="weather-page">

    <div className="navbar">
      {/* Navbar Section */}
      <Link to="/Activities" className="nav-button">
        <img src="/activities-icon.png" />
        {translatedLabels.activitiesNavbar}
      </Link>
      <Link to="/Weather" className="nav-button">
        <img src="/weather-icon.png" />
        {translatedLabels.weatherNavbar}
      </Link>
      <Link to="/Settings" className="nav-button">
        <img src="/settings-icon.png" />
        {translatedLabels.settingsNavbar}
      </Link>
    </div>

    {/* Main Weather Container */}
    <div className="weather-container">
      {/* Search Bar Section */}
      <div className="main-content">
        <div className="searchbar">
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            placeholder={translatedLabels.searchPlaceholder}
            className="input-city-name"
          />
          <button onClick={handleSearch} className="get-weather-button">
            <img id="search-icon" width="22" height="22" src="/search-icon.png" />
          </button>
        </div>

        {/* Weather Information Section */}
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <img
              src={fetchWeatherIcon(weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
              className="weather-icon"
            />

            <h1 className="temperature">{Math.round(convertTemperature(weatherData.main.temp))}º{unit === "Celsius" ? "C" : "F"}</h1>

            <div className="weather-details">
              {weatherMetrics.windSpeed && (
                <p>🌬 WS  {convertWindSpeed(weatherData.wind.speed)} {unit === "Celsius" ? "km/h" : "mph"}</p>
              )}
              {weatherMetrics.precipitation && (
                <p>☔ RF  {weatherData.rain ? weatherData.rain["1h"] : 0} mm</p>
              )}
              {weatherMetrics.uvIndex && uvIndex !== null && (
                <p>☀️ UV  {uvIndex}</p>
              )}
              {weatherMetrics.airQuality && airQualityData?.list[0]?.main?.aqi && (
                <p>💨 AQ {airQualityData.list[0].main.aqi}</p>
              )}
            </div>

            {/* Forecast Section */}
            {forecastData && forecastData.length > 0 && (
              <div className="forecast-container">
                {forecastData.map((hour, index) => (
                  <div key={index} className="forecast-item">
                    <p>{new Date(hour.dt_txt).getHours()}:00</p>
                    <img
                      src={fetchWeatherIcon(hour.weather[0].icon)}
                      alt={hour.weather[0].description}
                    />
                    <p>{Math.round(convertTemperature(hour.main.temp))}º{unit === "Celsius" ? "C" : "F"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map Section */}
      <div className="map-container">
        {coordinates.lat && coordinates.lon && (
          <MapContainer
            center={[coordinates.lat, coordinates.lon]}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <RecenterMap /> {/* This component centers the map when coordinates change */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[coordinates.lat, coordinates.lon]} icon={customMarker}>
              <Popup>{city}</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
 </div>
  );
};

export default Weather;