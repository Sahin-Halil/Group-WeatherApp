import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

// server.js
// backend code for fetching nearby places using Google Maps API for activites page

dotenv.config(); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.ACTIVITIES_API_KEY; // Google Maps API key from .env

// Endpoint to fetch nearby places based on a city name.
app.get("/places", async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }

    // get latitude and longitude for the given city
    const geoResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results.length) {
      return res.status(404).json({ error: "City not found" });
    }

    const { lat, lng } = geoData.results[0].geometry.location;

    // fetch nearby tourist attractions and places of interest
    const placesResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=tourist_attraction&key=${API_KEY}`
    );
    const placesData = await placesResponse.json();
    
    if (placesData.status !== "OK") {
        return res.status(500).json({ error: placesData.error_message });
      }
    
    // Define the allowed types of places to filter results.
    const allowedTypes = [
      "tourist_attraction",
      "museum",
      "park",
      "restaurant",
      "cafe",
      "art_gallery",
      "amusement_park",
      "zoo",
      "aquarium",
      "shopping_mall",
      "church",
      "mosque"
    ];
    
    // limit to 5 places and extract relevant info
    const filteredPlaces = placesData.results.slice(0, 5).map((place) => {
      const matchedType = place.types?.find((t) => allowedTypes.includes(t)) || "other";
      return {
        name: place.name,
        area: place.vicinity,
        rating: place.rating,
        type: matchedType, 
      };
    });
    
    res.json(filteredPlaces);
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
