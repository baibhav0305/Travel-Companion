import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapComponent.scss";
import { useSelector } from "react-redux";
import { getPlace } from "../../../features/placeSlice";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const URL = "https://trueway-geocoding.p.rapidapi.com/Geocode";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFpYmhhdjAzMDUiLCJhIjoiY2t1emN6ZHc0MnhyaDJ1cXYxcmQxMWQ3ZSJ9.itQ11hfqUtum_zJvYZhHmg";

const MapComponent = () => {
  const { place } = useSelector(getPlace);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const mapContainerRef = useRef(null);

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
        const { data } = await axios.get(URL, options);
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
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 10,
      pitch: 70,
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: [lng, lat],
        zoom: 10,
        mapboxgl: mapboxgl,
      })
    );

    new mapboxgl.Marker({ color: "red" }).setLngLat([lng, lat]).addTo(map);
  }, [lat, lng]);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ width: 600, height: 500, borderRadius: 10 }}
    />
  );
};

export default MapComponent;
