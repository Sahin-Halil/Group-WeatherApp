import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Weather.css";

import ClearDay from "./weather-icons/sun.png";
import CloudyDay from "./weather-icons/cloudy-day.png";
import Rain from "./weather-icons/rain.png";
import Snow from "./weather-icons/snow.png";
import ClearNight from "./weather-icons/clear-night.png";
import CloudyNight from "./weather-icons/cloudy-night.png";

const Weather = () => {
  const [city, setCity] = useState("");
  const[placeholder, setPlaceholder] = useState("Enter City Name")
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const API_KEY = "b29c6dcf39f9032ef46114505c791779";

  const fetchWeather = async () => {
    if (!city){ 
      setPlaceholder("Please enter a city name.");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setPlaceholder("Enter city name");

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setForecastData(forecastResponse.data.list.slice(0, 5));
    } catch (error) {
      console.error("Error fetching weather data:", error);

      // Handle 404 (City Not Found) error
    if (error.response && error.response.status === 404) {
      setPlaceholder("City not found. Please enter a valid city.");
    } else {
      setPlaceholder("An error occurred while fetching weather data. Please try again later.");
    }

    setCity("")


    }
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
  }

  return (
    <div className="weather-container">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder={placeholder}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-city-name"
        />
        <button onClick={fetchWeather} className="get-weather-button">
          <img id="search-icon" width="22" height="22" src="/search-icon.png"></img>
        </button>
      </div>

      {weatherData && (
        <div className="weather-data">
          <h2>{weatherData.name}</h2>
          <div className="weather-icon">
            <img
              src={fetchWeatherIcon(weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
              className="weather-icon"
            />
          </div>

          <h1 className="temperature">{Math.round(weatherData.main.temp)}º</h1>

          <div className="weather-details">
            <p>💧 {weatherData.main.humidity}%</p>
            <p>🌬 {weatherData.wind.speed} km/h</p>
            <p>☔ {weatherData.clouds.all}%</p>
          </div>

        {forecastData && forecastData.length > 0 && (
          <div className="forecast-container">
            {forecastData.map((hour,index) => (
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

    <div className="bottom-nav">
      <Link to="/Activities" className="nav-button">
        <img src="/activities-icon.png"/>
        Activities
      </Link>
      <Link to="/Weather" className="nav-button">
        <img src="/weather-icon.png"/>
        Weather
      </Link>
      <Link to="/Settings" className="nav-button">
        <img src="/settings-icon.png"/>
        Settings
      </Link>
    </div>
    </div>
    );
  };

export default Weather;
