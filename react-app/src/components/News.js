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

let newsDate = [];
let newsHeadline = [];
let newsImage = [];
let newsSummary = [];
let newsUrl = [];
let newsRelated = [];

function News ({ authenticated, setAuthenticated, symbol }) {
  const [data, setData] = useState([]);
  const [tradeData, setTradeData] = useState("");


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/news/last/${3}?token=Tpk_a72f593783e9451990a7e3a0fceb28e5`
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
      <div className="all__news">
        {data &&
          data.map((data, idx) => {
            return (
              <>
                <Card
                  className="stock_card"
                  style={{ width: "40rem", color: "grey" }}
                >
                  <CardBody>
                    <CardTitle
                      className="card_title"
                      style={{ color: "grey", fontSize: 13 }}
                    >
                      {data.headline}{" "}
                    </CardTitle>
                    <CardText
                      className="card_subtitle"
                      style={{ color: "grey", fontSize: 13 }}
                    >
                      {data.summary}
                    </CardText>
                    <CardLink
                      href={`https://cloud.iexapis.com/v1/${data.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      {data.url}{" "}
                    </CardLink>

                    <CardText
                      className="number"
                      style={{ color: "grey", fontSize: 13 }}
                    >
                      {data.source}
                      <CardImg top src={data.image} alt={data.image} />
                    </CardText>
                  </CardBody>
                </Card>
              </>
            );
          })}
      </div>
    );
  }
}

export default News;
