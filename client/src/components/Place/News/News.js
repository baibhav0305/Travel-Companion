import React, { useEffect, useState } from "react";
import axios from "axios";
import "./News.scss";
import { useSelector } from "react-redux";
import { getPlace } from "../../../features/placeSlice";

const URL = "https://bing-news-search1.p.rapidapi.com/news/search";

const News = () => {
  const [news, setNews] = useState([]);
  const { place } = useSelector(getPlace);

  useEffect(() => {
    const options = {
      params: {
        q: { place },
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "02830c346emsh2606c2508f81c59p1b7059jsn5006c032fb80",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    };
    const getNews = async () => {
      const {
        data: { value },
      } = await axios.get(URL, options);
      setNews(value);
    };

    if (place !== "") {
      getNews();
    }
  }, [place]);
  return (
    <>
      {news && (
        <div className="news-container">
          <h5 style={{ fontWeight: "700" }}>News from {place.toUpperCase()}</h5>
          {news.map((n, i) => (
            <div className="card" key={i}>
              <div className="headline">
                <a href={n.url} target="_blank" rel="noreferrer noopener">
                  {n.name}
                </a>
                <p>{n.description}</p>
              </div>
              <div className="img">
                <img
                  src={n.image ? n.image.thumbnail.contentUrl : ""}
                  alt="news"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default News;
