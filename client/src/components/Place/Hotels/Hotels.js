import React from "react";
import "./Hotels.scss";

const Hotels = ({ hotel }) => {
  // console.log(hotel);
  return (
    <div className="card hotel-card">
      <div className="upper">
        <img
          src={
            hotel.photo
              ? hotel.photo.images.large.url
              : "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          }
          alt="hotel"
          height="50px"
          width="50px"
        />
        <div className="review">
          <div className="phone">
            <i className="fa-solid fa-phone"></i>
            <span>{hotel.phone}</span>
          </div>
          <span style={{ marginRight: "5px", marginTop: "1px" }}>
            {hotel.rating}
          </span>
          <i className="fa-solid fa-star" style={{ color: "#FFD700" }}></i>
        </div>
      </div>
      <h6>{hotel.name}</h6>
    </div>
  );
};

export default Hotels;
