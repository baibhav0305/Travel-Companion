import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlace, getPlace } from "../../../features/placeSlice";
import axios from "axios";
import "./Overview.scss";

const URL = "https://wiki-briefs.p.rapidapi.com/search";

const Overview = () => {
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const { place } = useSelector(getPlace);
  const [info, setInfo] = useState();

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(addPlace(location));
    setLocation("");
  };

  useEffect(() => {
    const options = {
      params: { q: { place }, topk: "5" },
      headers: {
        "X-RapidAPI-Key": "02830c346emsh2606c2508f81c59p1b7059jsn5006c032fb80",
        "X-RapidAPI-Host": "wiki-briefs.p.rapidapi.com",
      },
    };

    const getPlaceDetail = async () => {
      setInfo();
      const { data } = await axios.get(URL, options);
      setInfo(data);
    };

    if (place !== "") {
      getPlaceDetail();
    }
  }, [place]);

  return (
    <>
      <div className="search">
        <div className="container">
          <input
            type="text"
            placeholder="Search your destination"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      {place && info && (
        <div className="information-container">
          <h4>{place.toUpperCase()}</h4>
          <div className="details">
            <div className="para">
              {info.summary.map((s, i) => (
                <p key={i}>{s}</p>
              ))}
            </div>
            {info.image && (
              <img
                src={info.image}
                alt="placePic"
                height="300px"
                width="400px"
                style={{ objectFit: "cover", borderRadius: "20px" }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
