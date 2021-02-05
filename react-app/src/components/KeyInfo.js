import React, { useState, useEffect } from "react";
import "../styles/BuyTrade.css";
import numeral from "numeral";
import {Row, Col} from "react-bootstrap/"

function KeyInfo({ authenticated, setAuthenticated, symbol }) {
  const [tradeData, setTradeData] = useState("");


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

  return (
    <div className="info_container">
      <div
        style={{
          color: "grey",
          fontSize: 15,
        }}
      >
        <div className="section_title user_balance">
          <i className="fas fa-info-circle card_icon"></i>Key Information
        </div>{" "}
      </div>
      <Row className="keyInfo">
        <Col className="info_wrapper col-4">
          {/* extendedChange{tradeData.extendedChange} */}
          <h1 style={{ color: "grey", fontSize: 12 }}>Market Cap</h1>
          <h1
            style={{
              color: "white",
              fontSize: 15,
              className: "section_title user_balance",
            }}
          >
            {numeral(Number(tradeData.marketCap)).format("($ 0.0 a)")}
          </h1>
        </Col>
        <Col className="info_wrapper col-4">
          <h1 style={{ color: "grey", fontSize: 12 }}>PE Ratio [TTM]</h1>
          <h1
            style={{
              color: "white",
              fontSize: 15,
              className: "section_title user_balance",
            }}
          >
            {tradeData.peRatio}
          </h1>
        </Col>
        <Col className="info_wrapper col-4">
          <h1 style={{ color: "grey", fontSize: 12 }}>52 Week High</h1>
          <h1
            style={{
              color: "white",
              fontSize: 15,
              className: "section_title user_balance",
            }}
          >
            {numeral(Number(tradeData.week52High)).format("($ 0.00)")}
          </h1>
        </Col>
        <Col className="info_wrapper col-4">
          <h1 style={{ color: "grey", fontSize: 12 }}>52 Week Low</h1>
          <h1
            style={{
              color: "white",
              fontSize: 15,
              className: "section_title user_balance",
            }}
          >
            {numeral(Number(tradeData.week52Low)).format("($ 0.00)")}
          </h1>
        </Col>
        <Col className="info_wrapper col-4">
          <h1 style={{ color: "grey", fontSize: 12 }}>YTD Change</h1>
          <h1
            style={{
              color: "white",
              fontSize: 15,
              className: "section_title user_balance",
            }}
          >
            {Number(tradeData.ytdChange).toFixed(2)}%
          </h1>
        </Col>
        <Col className="info_wrapper col-4">
          <h1 style={{ color: "grey", fontSize: 12 }}>Volume</h1>
          <h1
            style={{
              color: "white",
              fontSize: 15,
              className: "section_title user_balance",
            }}
          >
            {numeral(Number(tradeData.iexVolume)).format("(0,00 a)")}
          </h1>
        </Col>
      </Row>
    </div>
  );
}

export default KeyInfo;
