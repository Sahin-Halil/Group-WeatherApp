import React, { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";
import "./Weather.css";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import ClearDay from "./weather-icons/sun.png";
import CloudyDay from "./weather-icons/cloudy-day.png";
import Rain from "./weather-icons/rain.png";
import Snow from "./weather-icons/snow.png";
import ClearNight from "./weather-icons/clear-night.png";
import CloudyNight from "./weather-icons/cloudy-night.png";

const customMarker = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Weather = ({ city, setCity, weatherData, setWeatherData, forecastData, setForecastData }) => {
  const [coordinates, setCoordinates] = useState({ lat: 51.5074, lon: -0.1278 });
  const [marker, setMarker] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (!weatherData) {
      getUserLocation();
    }
  }, []);

  // Handle fetching weather data and updating coordinates
  const fetchWeather = async (location, lat = null, lon = null) => {
    try {
      let weatherUrl;
      let forecastUrl;

      if (lat && lon) {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      } else {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`;
      }

      const weatherResponse = await axios.get(weatherUrl);
      if (weatherResponse.data) {
        setWeatherData(weatherResponse.data);
        setCity(weatherResponse.data.name);
        const lat = weatherResponse.data.coord.lat;
        const lon = weatherResponse.data.coord.lon;
        setCoordinates({ lat, lon }); // Update coordinates
      }

      const forecastResponse = await axios.get(forecastUrl);
      if (forecastResponse.data) {
        const hourlyForecast = forecastResponse.data.list.filter((entry, index) => index < 6);
        setForecastData(hourlyForecast);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert("City not found. Please enter a valid city.");
      } else {
        alert("An error occurred while fetching weather data. Please try again later.");
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

  const handleSearch = () => {
    if (!city.trim()) {
      alert("Please enter a valid city.");
      return;
    }
    fetchWeather(city);
  };

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
      <Link to="/Activities" className="nav-button">
        <img src="/activities-icon.png" />
        Activities
      </Link>
      <Link to="/Weather" className="nav-button">
        <img src="/weather-icon.png" />
        Weather
      </Link>
      <Link to="/Settings" className="nav-button">
        <img src="/settings-icon.png" />
        Settings
      </Link>
    </div>

    <div className="weather-container">

      <div className="main-content">
        <div className="searchbar">
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="input-city-name"
          />
          <button onClick={handleSearch} className="get-weather-button">
            <img id="search-icon" width="22" height="22" src="/search-icon.png" />
          </button>
        </div>

        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <img
              src={fetchWeatherIcon(weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
              className="weather-icon"
            />
            <h1 className="temperature">{Math.round(weatherData.main.temp)}º</h1>

            <div className="weather-details">
              <p>💧 {weatherData.main.humidity}%</p>
              <p>🌬 {weatherData.wind.speed} km/h</p>
              <p>☔ {weatherData.clouds.all}%</p>
            </div>

            {forecastData && forecastData.length > 0 && (
              <div className="forecast-container">
                {forecastData.map((hour, index) => (
                  <div key={index} className="forecast-item">
                    <p>{new Date(hour.dt_txt).getHours()}:00</p>
                    <img
                      src={fetchWeatherIcon(hour.weather[0].icon)}
                      alt={hour.weather[0].description}
                    />
                    <p>{Math.round(hour.main.temp)}ºC</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

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