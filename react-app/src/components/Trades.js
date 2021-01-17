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
  const [refeshFromBuy, setRefeshFromBuy] = useState("");

  useEffect(() => {
    (async () => {
      const data = await axios.get(`/api/trade/${currentUserId}`);

      setTrades(data.data.trade_items);
      // setLoaded(false);
      setRefresh(false);
      setRedirect(false);
    })();
  }, [redirect, refeshFromBuy]);

  if (!trades) return (
    <AddTrade
      accountId={accountId}
      setRefeshFromBuy={setRefeshFromBuy}
      setRefresh={setRefresh}
    />
  )
  if (trades) {
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
                      setRedirect(true);
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
}




 
  
export default Trades;