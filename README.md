# 🌤 Weather App

📖 **Overview**  
This project was developed as part of our coursework for **ECS522U Graphical User Interface (GUI)** at **Queen Mary University of London**.  

The goal is to provide users with weather forecasts and local activity suggestions based on their location.  

It was built collaboratively by a group of students using modern web technologies, APIs, and a modular frontend/backend architecture.

---

## 👥 Team Members

| Name           | Student Email              |
|----------------|----------------------------|
| Sahin Halil    | s.halil@se23.qmul.ac.uk    |
| Molly Hall     | m.hall@se23.qmul.ac.uk     |
| Yaseen Haque   | m.haque@se23.qmul.ac.uk   |
| Jishad Hoque   | j.hoque@se23.qmul.ac.uk    |
| Yaqub Hassan   | y.hassan@se23.qmul.ac.uk   |

---

## 💡 Features

- 🌦 **Weather Forecast**: Fetches current weather and 5-hour forecast using the OpenWeather API  
- 🏞 **Activity Recommendations**: Suggests nearby places of interest using the Google Places API, and Geolocation API to provide results based on the user's desired location  
- 📍 **GPS Support**: Automatically detects user location for tailored updates  
- 🔎 **City Search**: Users can enter a city name manually to retrieve weather and location-based activity data  
- 🗺️ **Interactive Map**: Displays a live map using Leaflet with a marker for the user's current or searched location  
- ⚙️ **Backend Server**: Node.js + Express backend handles activity API requests securely
- 📱 **Responsive Design**: Mobile-friendly layout using React and custom CSS that adapts to all screen sizes  
- 🧭 **Navigation Bar**: Seamless navigation between Weather, Activities, and Settings pages with persistent bottom nav for mobile users  
- 🌡️ **Unit Toggle**: Switch between Celsius and Fahrenheit temperature units  
- 🌬️ **Metric Customisation**: Toggle display of key weather metrics like wind speed, precipitation, UV index, and air quality  
- 🗣️ **Multilingual Support**: App supports English, Spanish, and French, with translations applied across the UI  

---

## 🧪 Technologies Used

- **Frontend**: React  
- **Backend**: Node.js, Express  
- **APIs**:  
  - [OpenWeatherMap API](https://openweathermap.org/api)  
  - [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)  
  - [Geocoding API](https://developers.google.com/maps/documentation/geocoding/start)  

---

## 📦 Installation

### 1️⃣ Install Node.js & npm  
If you don’t have Node.js installed:  
Download it from [https://nodejs.org](https://nodejs.org) and install the **LTS** version.  
Make sure to check “**Add to PATH**” during installation.

To verify:
```bash
node -v
npm -v
```

---

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/Yazeenn/weather-app.git
cd weather-app
```

---

### 3️⃣ Install Dependencies

#### 🔧 Backend
```bash
cd backend
npm install
```

#### 💻 Frontend
```bash
cd ../
npm install
npm install leaflet react-leaflet
```

---

### 4️⃣ Set Environment Variables

Create a `.env` file in **both** the frontend (`weather-app`) and backend folders.

#### `weather-app/.env`:
```env
REACT_APP_WEATHER_API_KEY="API key removed for safety"
```

#### `backend/.env`:
```env
ACTIVITIES_API_KEY="API key removed for safety"
```

---

### 🏃‍♂️ Run the Project

In **two terminal windows**:

#### 🖥 Backend
```bash
cd backend
node server.js
```

#### 🌐 Frontend
```bash
cd weather-app
npm start
```

---

## 🚀 Launch the App

Once both frontend and backend are running, open your browser and navigate to:

[http://localhost:3000](http://localhost:3000)
