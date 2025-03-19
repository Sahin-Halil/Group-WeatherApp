import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Weather from "./Weather";
import Activities from "./Activities";
import Settings from "./Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/Weather" element={<Weather />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;