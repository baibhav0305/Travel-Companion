import React from "react";
import "./Card.scss";

const Card = () => {
  return (
    <div className="container-fluid custom-card">
      <div className="card">
        <i className="fa-solid fa-street-view"></i>
        <h5>Best Near You</h5>
        <p>Find the best places to visit near you </p>
      </div>
      <div className="card">
        <i className="fa-solid fa-cloud-sun"></i>
        <h5>Weather Forecast</h5>
        <p>Get the latest weather information</p>
      </div>
      <div className="card">
        <i className="fa-solid fa-radio"></i>
        <h5>Latest News</h5>
        <p>Get the latest news and information</p>
      </div>
      <div className="card">
        <i className="fa-solid fa-utensils"></i>
        <h5>Perfect Restaurants</h5>
        <p>Enjoy the best delicacies in your city</p>
      </div>
    </div>
  );
};

export default Card;
