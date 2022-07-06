import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPlace } from "../../../../features/placeSlice";
import "./Template.scss";

const Template = ({ place, text, url }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNotify = () => {
    dispatch(addPlace(place));
    navigate("/place");
  };

  return (
    <div className="card template" onClick={handleNotify}>
      <img src={url} alt="place" />
      <div className="text">
        <h5>{place}</h5>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Template;
