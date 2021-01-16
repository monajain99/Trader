import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTrade from "./CreateTrade"
import { deleteTrade} from "../services/trades";
import {
  Form,
  Container,
  Button,
  Row,
  Col,
} from "react-bootstrap";
const Trades = ({ accountId, currentUserId, setRefresh }) => {
  const [trades, setTrades] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [refeshFromBuy, setRefeshFromBuy] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await axios.get(`/api/trade/${currentUserId}`);

      setTrades(data.data.trade_items);
      // setLoaded(false);
      setRefresh(false);
      setRedirect(false)
    })();
  }, [redirect]);

  if (!trades) return null;
  console.log(trades);
  // let tradeItems = trades.map((trade, idx) => {
  //   let val = 0;
  //   val = val + trade.price;
  // });
  return (
    <>
      <div>
        <AddTrade
          accountId={accountId}
          setRefeshFromBuy={setRefeshFromBuy}
          setRefresh={setRefresh}
        />

        {trades &&
          trades.map((trade, idx) => {
            return (
              <div>
                <div>Company Name{trade.name}</div>
                <div>Purchase Price{trade.price}</div>
                <div>Symbol {trade.ticker}</div>
                <div>No of Shares {trade.volume}</div>
                <div>Purchase Date {trade.transaction_date}</div>
                <div>Trade Value {trade.price * trade.volume}</div>
                <Button
                  onClick={() => {
                    deleteTrade(trade.id);
                    setRefresh(false);
                    setRedirect(false);
                  }}
                >
                  Sell
                </Button>
              </div>
            );
          })}
      </div>
    </>
  );
};




 
  
export default Trades;
