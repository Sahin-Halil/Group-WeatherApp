🌤 Weather App
A simple weather forecast app built with React and OpenWeather API.

📁 Project Structure (src Files)
App.js → Main component that renders the Weather component.
Weather.js → Handles API calls, user input, and displays weather data.
index.js → Entry point for the React app.
App.css → Styles for the app.
🚀 How to Run the App
Clone the repository:
sh
Copy
Edit
git clone https://github.com/Yazeenn/weather-app.git
cd weather-app
Install dependencies:
sh
Copy
Edit
npm install
Start the app:
sh
Copy
Edit
npm start
Open http://localhost:3000/ in your browser.
🌍 What the App Does So Far
✅ Allows users to enter a city name and fetch weather data.
✅ Displays temperature, weather conditions, humidity, and wind speed.
✅ Uses Axios to fetch data from the OpenWeather API.

🔜 Next Steps
🔹 Improve the UI and styling
🔹 Add location detection (Geolocation API)
🔹 Implement 7-day weather forecasts
🔹 Add unit toggle (°C/°F) and user settings

👥 Team Instructions
Pull the latest version before making changes:
sh
Copy
Edit
git pull origin main
Work on a separate branch:
sh
Copy
Edit
git checkout -b feature-branch-name
After changes, commit and push your branch:
sh
Copy
Edit
git add .
git commit -m "Short description of changes"
git push origin feature-branch-name
Create a Pull Request (PR) on GitHub and request a review before merging to main.
