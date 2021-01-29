import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/BuyTrade.css";
import Account from "./Account";
import numeral from "numeral"
import { Card, CardBody, CardTitle, CardText, CardLink } from "reactstrap";

function Price({ authenticated, setAuthenticated, symbol }) {
  const [data, setData] = useState("");
  const [stock, setStock] = useState("");
  const [tradeData, setTradeData] = useState("");

  const handleChange = (event) => setStock(event.target.value);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=Tpk_a72f593783e9451990a7e3a0fceb28e5`
      );
      const responseData = await response.json();
      setTradeData(responseData);
    }
    fetchData();
  }, [symbol]);

// console.log(tradeData)
  return (
    <div className="right_side">
      <div className="section_title user_balance">
        <i className="fas fa-chart-line card_icon"></i>Stock Price
      </div>
      <Card className="price_card">
        <CardBody>
          <div>
            <CardText className="card_subtitle">
              {tradeData.companyName}
            </CardText>
            <CardText className="section_title user_balance">
              ${numeral(Number(tradeData.latestPrice)).format("( 0.00)")}
            </CardText>
            <CardText
              className={
                Math.sign(tradeData.changePercent) === 1
                  ? "positive_number"
                  : "negative_number"
              }
            >
              {/* <i className="fas fa-long-arrow-alt-up card_icon"></i> */}
              {Number(tradeData.change).toFixed(2)} {"  "}[
              {Number(tradeData.changePercent).toFixed(2)}%]
            </CardText>
            <CardLink style={{ color: "white" }}>
              Previous Close: ${tradeData.previousClose}
            </CardLink>
            <CardLink style={{ color: "white" }}>
              Last Update: {tradeData.latestTime}
            </CardLink>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Price;
