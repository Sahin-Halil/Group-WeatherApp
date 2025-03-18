import React from "react";
import Navbar from "./Navbar";
import "./Activities.css";

const Activities = ({city}) => {
  return (
    <div className="activities-container">
      <h1>Things to do in {city} </h1>
      <p>This is where activity recommendations will go.</p>
      <Navbar />
    </div>
  );
};

export default Activities;