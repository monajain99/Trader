import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/BuyTrade.css";
import Account from "./Account";
import numeral from "numeral";
import { Card, CardBody, CardTitle, CardText, CardLink } from "reactstrap";
import {Row, Col} from "react-bootstrap/"

function KeyInfo({ authenticated, setAuthenticated, symbol }) {
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

  console.log(tradeData);
  return (
    <div className="info_container">
      <div
        style={{
          color: "grey",
          fontSize: 20,
        }}
      >
        <div className="section_title" style={{ color: "white", fontSize: 20 }}>
          <i className="fas fa-chart-line card_icon"></i>Key Informations
        </div>{" "}
      </div>
      <Row className="keyInfo">
        <Col className="info_wrapper col-4">
          {/* extendedChange{tradeData.extendedChange} */}
          <h1 style={{ color: "grey", fontSize: 12 }}>Market Cap</h1>
          <h1 style={{ color: "white", fontSize: 12 }}>
            {numeral(Number(tradeData.marketCap)).format("($ 0 a)")}
          </h1>
        </Col>
        <Col className="info_wrapper col-4">
          <h1 style={{ color: "grey", fontSize: 12 }}>PE Ratio(TTM)</h1>
          <h1 style={{ color: "white", fontSize: 12 }}>{tradeData.peRatio}</h1>
        </Col>
        <Col className="info_wrapper col-4">
          <div style={{ color: "grey", fontSize: 12 }}>52 Week High</div>
          <div style={{ color: "white", fontSize: 12 }}>
            {numeral(Number(tradeData.week52High)).format("($ 0 a)")}
          </div>
        </Col>
        <Col className="info_wrapper col-4">
          <div style={{ color: "grey", fontSize: 12 }}>52 Week Low</div>
          <div style={{ color: "white", fontSize: 12 }}>
            {numeral(Number(tradeData.week52Low)).format("($ 0 a)")}
          </div>
        </Col>
        <Col className="info_wrapper col-4">
        <div style={{ color: "grey", fontSize: 12 }}>YTD Change</div>
        <div style={{ color: "white", fontSize: 12 }}>
          {numeral(Number(tradeData.ytdChange)).format("($ 0 a)")}
          </div>
        </Col>
                <Col className="info_wrapper col-4">

        <div style={{ color: "grey", fontSize: 12 }}>Volume</div>
        <div style={{ color: "white", fontSize: 12 }}>
          {numeral(Number(tradeData.latestVolume)).format("( 0 a)")}
          </div>
          </Col>
      </Row>
    </div>
    
  );
}

export default KeyInfo;
