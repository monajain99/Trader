import React, { useState, useEffect } from "react";
import {
  Card,
  CardImgOverlay,
  CardLink,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";

import axios from "axios";
import "../styles/News.css";
const apiKey = "c902b0da948b4618a3d8749f106606b6";
const baseUrl = "https://sandbox.iexapis.com/stable/AAPL/financials/2?token= ";



function News ({ authenticated, setAuthenticated, symbol }) {
  const [data, setData] = useState([]);
  const [tradeData, setTradeData] = useState("");


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        // `https://sandbox.iexapis.com/stable/stock/${symbol}/news/last/${3}?token=Tpk_a72f593783e9451990a7e3a0fceb28e5`
        `https://cloud.iexapis.com/stable/stock/${symbol}/news/last/${2}?token=pk_6f789411fea3492293da22e99ff8d631`
      );
      const responseData = await response.json();
      console.log(responseData);
      setData(responseData);
    }
    fetchData();
  }, [symbol]);

  console.log(data);

  if (!data || data == undefined)
    return <div className="newsLoading">Loading News...</div>;
  if (data) {
    return (
      <div className="news_wrapper1">
        <div className="section_title user_balance">
          <i className="fas fa-wifi card_icon"></i>News
        </div>
        {data &&
          data.map((data, idx) => {
            return (
              <div className="news_wrapper">
                <Card
                  className="stock_card news_card"
                  style={{ width: "30rem", color: "grey" }}
                >
                  <CardLink
                    href={`${data.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CardImg
                      top
                      src={data.image}
                      alt={data.image}
                      style={{ width: "8rem", height: "4rem" }}
                    />
                    <CardTitle
                      className="card_title"
                      style={{ color: "grey", fontSize: 9 }}
                    >
                      {data.headline}{" "}
                    </CardTitle>
                    <CardText
                      className="card_title"
                      style={{ color: "grey", fontSize: 10 }}
                    >
                      {data.summary}
                    </CardText>

                    <CardText
                      className="number"
                      style={{ color: "grey", fontSize: 13 }}
                    >
                      {data.source}
                    </CardText>
                  </CardLink>
                </Card>
              </div>
            );
          })}
      </div>
    );
  }
}

export default News;
