# 🌤 Weather App

📖 **Overview**  
This project was developed as part of our coursework for **ECS522W Graphical User Interface (GUI)** at **Queen Mary University of London**.  
The goal is to provide users with weather forecasts and local activity suggestions based on their location.  

It was built collaboratively by a group of students using modern web technologies, APIs, and a modular frontend/backend architecture.

---

## 👥 Team Members

| Name           | Student Email              |
|----------------|----------------------------|
| Sahin Halil    | s.halil@se23.qmul.ac.uk    |
| Molly Hall     | m.hall@se23.qmul.ac.uk     |
| Yaseen Haque   | y.hassan@se23.qmul.ac.uk   |
| Jishad Hoque   | j.hoque@se23.qmul.ac.uk    |
| Yaqub Hassan   | y.hassan@se23.qmul.ac.uk   |

---

## 💡 Features

- 🌦 **Weather Forecast**: Fetches current weather and 5-hour forecast using OpenWeather API  
- 🏞 **Activity Recommendations**: Suggests nearby places of interest using the Google Places API  
- 📍 **Geolocation Support**: Detects your location to provide tailored weather and activity info  
- 🔎 **City Search**: Users can enter a city name manually to retrieve data  
- ⚙️ **Backend Server**: Node.js + Express handles activity API requests securely  
- 📱 **Responsive Design**: Mobile-friendly layout using React and custom CSS  
- 🧭 **Navigation Bar**: Seamless navigation through the app  

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
npm install leaflet
```

---

### 4️⃣ Set Environment Variables

Create a `.env` file in **both** the frontend (`weather-app`) and backend folders.

#### `weather-app/.env`:
```env
REACT_APP_WEATHER_API_KEY=b29c6dcf39f9032ef46114505c791779
```

#### `backend/.env`:
```env
ACTIVITIES_API_KEY=AIzaSyAJGn2aw7rmJfLkyEsHSJfr4lB79QJamzk
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

Open your browser and go to:  
[http://localhost:3000](http://localhost:3000) 
