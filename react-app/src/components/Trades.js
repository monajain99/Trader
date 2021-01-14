import React, { useState, useEffect } from "react";
import axios from "axios";
import alpacaApi from "../services/trades";

const Trades = ({ accountId, currentUserId}) => {
  console.log(accountId);
  const [trades, setTrades] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await axios.get(`/api/trade/${accountId}`);
      setTrades(data.data.trade_items);
      setLoaded(true);
    })();
  }, []);

  if (!loaded) return null;
  let tradeItems = trades.map((trade, idx) => {
    let val = 0
    val = val + (trade.price);
    console.log (val)
  });

  return (
    <>
      <div>
        {
          trades.map((trade, idx) => {
            let val = 0
            val = val + trade.price * trade.volume
            
            return (
              <>
                <div>Company Name{trade.name}</div>
                <div>Purchase Price{trade.price}</div>
                <div>Symbol {trade.ticker}</div>
                <div>No of Shares {trade.volume}</div>
                <div>Purchase Date {trade.transaction_date}</div>
                <div>Trade Value {trade.price * trade.volume}</div>
                <button
                  onClick={}
                >
                </button>
              </>
            );
          })
        }
      </div>
    </>
  );
};




 
  
export default Trades;
