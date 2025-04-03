// App.js
// Main application component that handles routing and shared state (city, weather data, language, metrics)

import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Weather from "./Weather";
import Activities from "./Activities";
import Settings from "./Settings";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  // load saved language from local storage or default to english
  const [weatherMetrics, setWeatherMetrics] = useState(() => {
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
      // return default metrics if parsing fails
      return {
        precipitation: true,
        uvIndex: false,
        airQuality: false,
        windSpeed: true,
      };
    }
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Weather city = {city} setCity={setCity} weatherData = {weatherData} setWeatherData = {setWeatherData} forecastData = {forecastData} setForecastData = {setForecastData}/>} />
        <Route path="/Weather" element={<Weather city = {city} setCity={setCity} weatherData = {weatherData} setWeatherData = {setWeatherData} forecastData = {forecastData} setForecastData = {setForecastData} language={language} setLanguage={setLanguage} weatherMetrics={weatherMetrics} setWeatherMetrics={setWeatherMetrics}/>} />
        <Route path="/Activities" element={<Activities city={city}/>} />
        <Route path="/Settings" element={<Settings language={language} setLanguage={setLanguage} weatherMetrics={weatherMetrics} setWeatherMetrics={setWeatherMetrics}/>} />
      </Routes>
    </Router>
  );
}

export default App;