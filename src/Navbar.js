import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';


const Navbar = () => {
    return (
        <nav className="bottom-nav">
              <Link to="/Activities" className="nav-button">
                <img src="/activities-icon.png"/>
                Activities
              </Link>
              <Link to="/Weather" className="nav-button">
                <img src="/weather-icon.png"/>
                Weather
              </Link>
              <Link to="/Settings" className="nav-button">
                <img src="/settings-icon.png"/>
                Settings
              </Link>
        </nav>
    );
};

export default Navbar;