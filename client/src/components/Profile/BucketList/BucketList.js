import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteBucketList } from "../../../features/bucketListSlice";
import "./BucketList.scss";
import { addPlace } from "../../../features/placeSlice";
import { useNavigate } from "react-router-dom";

const URL = "https://wiki-briefs.p.rapidapi.com/search";

const BucketList = ({ place }) => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteBucketList(place._id));
  };

  useEffect(() => {
    const options = {
      params: { q: place.place, topk: "1" },
      headers: {
        "X-RapidAPI-Key": "02830c346emsh2606c2508f81c59p1b7059jsn5006c032fb80",
        "X-RapidAPI-Host": "wiki-briefs.p.rapidapi.com",
      },
    };

    const getPhoto = async () => {
      const { data } = await axios.get(URL, options);
      setUrl(data.image);
    };

    getPhoto();
  }, [place]);

  const handleBucketListPlace = () => {
    dispatch(addPlace(place.place));
    navigate("/place");
  };

  return (
    <div className="card bucket">
      <img src={url} alt="bucketList" onClick={handleBucketListPlace} />
      <div className="places" onClick={handleBucketListPlace}>
        <h4>{place.place}</h4>
      </div>
      <div className="icons">
        <i className="fa-solid fa-trash-can" onClick={handleDelete}></i>
      </div>
    </div>
  );
};

export default BucketList;
