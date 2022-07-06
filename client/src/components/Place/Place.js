import React, { useEffect, useState } from "react";
import axios from "axios";
import Hotels from "./Hotels/Hotels";
import Overview from "./Overview/Overview";
import MapComponent from "./MapComponent/MapComponent";
import Weather from "./Weather/Weather";
import News from "./News/News";
import { toast } from "react-toastify";
import "./Place.scss";
import { useDispatch, useSelector } from "react-redux";
import { createBucketList } from "../../features/bucketListSlice";
import { getPlace } from "../../features/placeSlice";
import { getUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng";
const URLCoord = "https://trueway-geocoding.p.rapidapi.com/Geocode";

const Place = () => {
  const { user } = useSelector(getUser);
  const { place } = useSelector(getPlace);
  const [hotel, setHotel] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    if (!user) {
      toast.warn("Please Login");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const options = {
      params: { address: place },
      headers: {
        "X-RapidAPI-Key": "02830c346emsh2606c2508f81c59p1b7059jsn5006c032fb80",
        "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
      },
    };

    const getCoord = async () => {
      try {
        const { data } = await axios.get(URLCoord, options);
        setLat(data.results[0].location.lat);
        setLng(data.results[0].location.lng);
      } catch (error) {
        console.log(error);
      }
    };
    if (place !== "") {
      getCoord();
    }
  }, [place, lat, lng]);

  useEffect(() => {
    const options = {
      params: {
        latitude: lat,
        longitude: lng,
      },
      headers: {
        "X-RapidAPI-Key": "d41d1d81a3mshf2f70d0f87aa235p15df37jsn234689ca5266",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    const getPlaceData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(URL, options);
        setHotel(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (lat && lng) {
      getPlaceData();
    }
  }, [lat, lng]);

  const handleMove = () => {
    window.scroll(0, 0);
  };

  const handleBucketList = () => {
    dispatch(createBucketList(place));
    toast.success(`${place.toUpperCase()} added to your Bucket List!`);
  };

  return (
    <div className="container-fluid">
      <div className=" search-bar">
        <Overview />
      </div>
      {place ? (
        <>
          <div className="move" onClick={handleMove}>
            <i className="fa-solid fa-angles-up"></i>
          </div>
          <button className="bucket btn btn-primary" onClick={handleBucketList}>
            <i className="fa-solid fa-plus"></i> Bucket List
          </button>
          <div className="details">
            <div className="hotel-container">
              <h5 style={{ fontWeight: "700" }}>
                Restaurants in {place.toUpperCase()}
              </h5>
              <div className="real">
                {hotel.length > 0 ? (
                  hotel.map((h, i) =>
                    h.name ? <Hotels hotel={h} key={i} /> : null
                  )
                ) : (
                  <h6>Loading ...</h6>
                )}
              </div>
            </div>
            <div className="weather">
              <h5 style={{ fontWeight: "700" }}>Weather</h5>
              <Weather />
            </div>
            <div className="map">
              <MapComponent />
            </div>
          </div>
          <div className="container">
            <News />
          </div>
        </>
      ) : (
        <h4 style={{ textAlign: "center", margin: "30px" }}>
          Please enter some destination 🙂🚀
        </h4>
      )}
    </div>
  );
};

export default Place;
