import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Weather from "./Weather";
import Activities from "./Activities";
import Settings from "./Settings";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Weather city = {city} setCity={setCity} weatherData = {weatherData} setWeatherData = {setWeatherData} forecastData = {forecastData} setForecastData = {setForecastData}/>} />
        <Route path="/Weather" element={<Weather city = {city} setCity={setCity} weatherData = {weatherData} setWeatherData = {setWeatherData} forecastData = {forecastData} setForecastData = {setForecastData}/>} />
        <Route path="/Activities" element={<Activities city={city}/>} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;