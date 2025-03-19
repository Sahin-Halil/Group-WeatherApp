import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Weather.css";
import Navbar from "./Navbar";

import ClearDay from "./weather-icons/sun.png";
import CloudyDay from "./weather-icons/cloudy-day.png";
import Rain from "./weather-icons/rain.png";
import Snow from "./weather-icons/snow.png";
import ClearNight from "./weather-icons/clear-night.png";
import CloudyNight from "./weather-icons/cloudy-night.png";

const Weather = ({city, setCity, weatherData, setWeatherData, forecastData, setForecastData}) => {

  useEffect(() => {
    if(!weatherData){
    getUserLocation();
    }
  }, []);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

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
  
      const response = await axios.get(weatherUrl);
      setWeatherData(response.data);

      const forecastResponse = await axios.get(forecastUrl);
      setForecastData(forecastResponse.data.list.slice(0, 5));
  
    } catch (error) {
  
      if (error.response) {
        alert("City not found. Please enter a valid city.");
      } else {
        alert("An error occurred while fetching weather data. Please try again later.");
      }
    }
  };
  
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(null, latitude, longitude); 
        },
        () => {
          alert("Location access denied. Please enable location services.");
          fetchWeather("London"); 
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      fetchWeather("London"); 
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
          placeholder={"Enter city name"}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-city-name"
        />
        <button onClick={() => fetchWeather(city)} className="get-weather-button">
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
    <Navbar />
    </div>
   );
  };

  export default Weather;

