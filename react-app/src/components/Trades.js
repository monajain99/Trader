import React, { useState, useEffect } from "react";
import axios from "axios";
import { deleteTrade} from "../services/trades";

const Trades = ({ accountId, currentUserId}) => {
  const [trades, setTrades] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await axios.get(`/api/trade/${accountId}`);
      setTrades(data.data.trade_items);
      setLoaded(true);
    })();
  }, [loaded]);

  if (!loaded) return null;
  let tradeItems = trades.map((trade, idx) => {
    let val = 0
    val = val + (trade.price);
  });

  return (
    <>
      <div>
        {
          trades.map((trade, idx) => {
                 
            return (
              <>
                <div>Company Name{trade.name}</div>
                <div>Purchase Price{trade.price}</div>
                <div>Symbol {trade.ticker}</div>
                <div>No of Shares {trade.volume}</div>
                <div>Purchase Date {trade.transaction_date}</div>
                <div>Trade Value {trade.price * trade.volume}</div>
                <button onClick={ () => {
                  deleteTrade(trade.id)
                    setLoaded(false);;
						      }}>
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
