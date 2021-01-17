import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import "../styles/News.css"
// const apiKey = "4c5eae41d3774570b49ae2caa80f989b";
const apiKey = "c902b0da948b4618a3d8749f106606b6";
const baseUrl = "https://sandbox.iexapis.com/stable/AAPL/financials/2?token= ";

function News({ authenticated, setAuthenticated, symbol }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://newsapi.org/v2/everything?q=${symbol}\ price&from=2021-01-14&sortBy=publishedAt&apiKey=${apiKey}`
      );
      const responseData = await response.json();
      setData(responseData.articles);
    }
    fetchData();
  }, [symbol]);
  if (!data) return ('loading...');
  if (data) {
    return (
      <div className="all__news">
        {data &&
          data.map((data, idx) => {
            
            return (
              <div className="news">
                <h5 className="news__title">{data.title}</h5>
                <p className="news__desc">{data.description}</p>
                <span className="news__author">{data.author}</span> <br />
                <span className="news__author">{data.url}</span> <br />
                <span className="news__published">{data.publishedAt}</span>
                <span className="news__source">{data.source.name}</span>
              </div>
            )
          })}
      </div>
    );
  }
}

export default News