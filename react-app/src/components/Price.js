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

console.log(tradeData)
  return (
    // <div>
    //   <div className="input">
    //     <input onChange={handleChange} placeholder="Search company..." />
    //     <button onClick={fetchData}>Search</button>
    //   </div>

    <>
      <Card
        className="stock_card stock-titles"
        style={{ width: "20rem", color: "grey" }}
      >
        <CardBody>
          <div>
            <CardText
              className="card_subtitle"
              style={{ color: "grey", fontSize: 13 }}
            >
              {tradeData.companyName}
            </CardText>
            <CardText
              className="number"
              style={{ color: "grey", fontSize: 13 }}
            >
              ${numeral(Number(tradeData.latestPrice)).format("( 0.00)")}
            </CardText>
            <CardText style={{ color: "#66b2b2	", fontSize: 13 }}>
              <i className="fas fa-long-arrow-alt-up card_icon"></i>
              {numeral(Number(tradeData.changePercent)).format("( 0.00)")}%
            </CardText>
            <div style={{ color: "white", fontSize: 13 }}>
              Previous Close: ${tradeData.previousClose}
            </div>
            <div style={{ color: "#66b2b2	", fontSize: 13 }}>
              Latest Time: {tradeData.latestTime}
            </div>
          </div>
        </CardBody>
      </Card>
      <div
        style={{
          color: "grey",
          fontSize: 20,
          position: "absolute",
          top: "60%",
          left: "12%",
        }}
      >
        <div className="section_title" style={{ color: "white", fontSize: 20 }}>
          <i className="fas fa-chart-line card_icon"></i>Key Informations
        </div>{" "}
      </div>
      <div className="keyInfo">
        {/* extendedChange{tradeData.extendedChange} */}
        <div style={{ color: "grey", fontSize: 13 }}>Market Cap</div>
        <div style={{ color: "white", fontSize: 20 }}>
          {numeral(Number(tradeData.marketCap)).format("($ 0 a)")}
        </div>
        <div style={{ color: "grey", fontSize: 13 }}>PE Ratio(TTM)</div>
        <div style={{ color: "white", fontSize: 20 }}>{tradeData.peRatio}</div>
        <div style={{ color: "grey", fontSize: 13 }}>52 Week High</div>
        <div style={{ color: "white", fontSize: 20 }}>
          {numeral(Number(tradeData.week52High)).format("($ 0 a)")}
        </div>
        <div style={{ color: "grey", fontSize: 13 }}>52 Week Low</div>
        <div style={{ color: "white", fontSize: 20 }}>
          {numeral(Number(tradeData.week52Low)).format("($ 0 a)")}
        </div>
        <div style={{ color: "grey", fontSize: 13 }}>YTD Change</div>
        <div style={{ color: "white", fontSize: 20 }}>
          {numeral(Number(tradeData.ytdChange)).format("($ 0 a)")}
        </div>
        <div style={{ color: "grey", fontSize: 13 }}>Volume</div>
        <div style={{ color: "white", fontSize: 20 }}>
          {numeral(Number(tradeData.latestVolume)).format("( 0 a)")}
        </div>
      </div>
    </>
    //{" "}
  );
};

export default Price;
