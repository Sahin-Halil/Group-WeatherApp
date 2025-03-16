# 🌤 Weather App  
A simple weather forecast app built with **React** and **OpenWeather API**.  

---

## 📁 Project Structure (src Files)  

- **`App.js`** → Main component that renders the Weather component.  
- **`Weather.js`** → Handles API calls, user input, and displays weather data.  
- **`index.js`** → Entry point for the React app.  
- **`App.css`** → Styles for the app.  

---

### 📌 Where Most of the Work Will Be Done  

Most of the core functionality will be implemented in **`Weather.js`**, as this file handles:  
- Fetching weather data from the **OpenWeather API**  
- Managing **user input** for city searches  
- Updating and displaying **weather information** dynamically  

Other files like **`App.js`** will mainly serve as a container for components, while **`App.css`** will handle styling.  

Additional features such as **unit toggles, geolocation, and notifications** will also be added within `Weather.js`, with supporting updates in other components if needed.

---

## 🚀 How to Run the App  

### Clone the repository:  

git clone https://github.com/Yazeenn/weather-app.git  
cd weather-app
### Install dependencies:
npm install
npm install react-router-dom
### Start the app:
npm start

### Open http://localhost:3000/ in your browser.

---

## 🌍 What the App Does So Far
### ✅ Allows users to enter a city name and fetch weather data.
### ✅ Displays temperature, weather conditions, humidity, and wind speed.
### ✅ Uses Axios to fetch data from the OpenWeather API.

---

## 🔜 Next Steps
🔹 Improve the UI and styling  
🔹 Add location detection (Geolocation API)  
🔹 Implement 7-day weather forecasts  
🔹 Add unit toggle (°C/°F) and user settings  

---

## 👥 Team Instructions
### Pull the latest version before making changes:
git pull origin main
### Work on a separate branch:
git checkout -b feature-branch-name
### After changes, commit and push your branch:
git add .  
git commit -m "Short description of changes"  
git push origin feature-branch-name  
### Create a Pull Request (PR) on GitHub and request a review before merging to main.
