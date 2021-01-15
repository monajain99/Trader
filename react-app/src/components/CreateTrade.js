import React, { useState, useEffect } from "react";
import axios from "axios";
import { addTrade } from "../services/trades";

function AddTrade({ currentUserId, accountId }) {
  const [ticker, setTicker] = useState("");
  const [price, setPrice] = useState("");
  const [volume, setVol] = useState("");
  const [name, setName] = useState("");
  const [stock_id, setStock_id] = useState("");


  useEffect(() => {
    (async () => {
      const stock = await axios.get(`/api/stocks`, { data: { 'ticker': ticker } });
      console.log('sssssssssss', stock.data.stocks)
      // stock.data.stocks.filter
      setStock_id(stock.data.stocks[0].id);
      setName(stock.data.stocks[0].name)
    })();
  },[])
  // const [tradeDate, setDate] = useState("");

  const account_id = accountId;
  // const account_id = "1";


  const createTrade = async (e) => {
    e.preventDefault();
    
    
    const response = await axios.post(`/api/trade/`, {
      account_id,
      ticker,
      price,
      volume,
      stock_id,
      transaction_date: "20202022",
    });
  };

  const updateTicker = (e) => {
    setTicker(e.target.value);
  };
  const updatePrice = (e) => {
    setPrice(e.target.value);
  };
  const updateVolume = (e) => {
    setVol(e.target.value);
  };

  return (
    <>
      <h1>Create Trade</h1>
      <div>
        <form onSubmit={createTrade}>
          <div>
            <div>
              <label>Ticker</label>
              <input
                name="ticker"
                type="text"
                placeholder="ex. $AAPL"
                onChange={updateTicker}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                name="price"
                type="integer"
                placeholder="ex. $20"
                onChange={updatePrice}
              />
            </div>
            <div>
              <label>volume</label>
              <input
                name="volume"
                type="integer"
                placeholder="ex. 100"
                onChange={updateVolume}
              />
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}


export default AddTrade