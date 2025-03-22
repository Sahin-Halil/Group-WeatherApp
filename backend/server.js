import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.ACTIVITIES_API_KEY;

app.get("/places", async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }

    const geoResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results.length) {
      return res.status(404).json({ error: "City not found" });
    }

    const { lat, lng } = geoData.results[0].geometry.location;

    const placesResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=tourist_attraction&key=${API_KEY}`
    );
    const placesData = await placesResponse.json();
    
    if (placesData.status !== "OK") {
        return res.status(500).json({ error: placesData.error_message });
      }
    
    const filteredPlaces = placesData.results.slice(0, 5).map((place) => ({
        name: place.name,
        area: place.vicinity,
        rating: place.rating,
    }));
    
    res.json(filteredPlaces);
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
