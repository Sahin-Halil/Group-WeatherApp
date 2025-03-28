import React, { useState, useEffect } from "react";
import "./Activities.css";

const Activities = ({ city }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchPlaces(city);
  }, [city]);

  const fetchPlaces = async (city) => {
    try {
      const response = await fetch(`http://localhost:5000/places?city=${city}`);
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };
  
  return (
    <div className="activities-container">
      <h1>Things to do in {city}</h1>
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
  );
};

export default Activities;
