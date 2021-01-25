import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/BuyTrade.css";
import Account from "./Account";
import numeral from "numeral"

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


  return (
    // <div>
    //   <div className="input">
    //     <input onChange={handleChange} placeholder="Search company..." />
    //     <button onClick={fetchData}>Search</button>
    //   </div>

    <div className="stock-container">
      <div className="stock-titles">
        <div style={{ color: "grey", fontSize: 20 }}>
          {tradeData.companyName}
        </div>
        <div style={{ color: "white", fontSize: 30 }}>
          ${tradeData.latestPrice}
        </div>
        <div style={{ color: "white" }}>
          ${tradeData.change} ~ (%
          {Math.round(tradeData.changePercent * 100) / 100})
        </div>
        <div style={{ color: "#66b2b2	", fontSize: 13 }}>
          Previous Close: ${tradeData.previousClose}
        </div>
        <div style={{ color: "#66b2b2	", fontSize: 13 }}>
          Latest Time: {tradeData.latestTime}
        </div>
      </div>
      <div
        style={{
          color: "grey",
          fontSize: 20,
          position: "absolute",
          top: "90%",
          left: "12%",
        }}
      >
        Key Information
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
    </div>
    //{" "}
  );
};

export default Price;
