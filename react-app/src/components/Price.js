import React, { useState, useEffect } from "react";
import axios from "axios";


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
      <div>
        <div className="stock-titles">
          <div>name{tradeData.companyName}</div>

          <div>changePercent{tradeData.changePercent}</div>
          <div>change{tradeData.change}</div>
          <div>previousClose{tradeData.previousClose}</div>
          <div>latestTime{tradeData.latestTime}</div>
          <div>latestPrice{tradeData.latestPrice}</div>
          <div>
            {/* extendedChange{tradeData.extendedChange} */}
            <div>Market Cap{tradeData.marketCap}</div>
            <div>"PE Ratio(TTM)" {tradeData.peRatio}</div>
            <div>"52 week High"{tradeData.week52High}</div>
            <div>"52 Week Low"{tradeData.week52Low}</div>
            <div>"YTD Change "{tradeData.ytdChange}</div>
            <div>"Volume "{tradeData.latestVolume}</div>
          </div>
        </div>
      </div>
      //{" "}
    </div>
  );
};

export default Price;
