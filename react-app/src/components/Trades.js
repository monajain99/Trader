import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTrade from "./CreateTrade"
import { deleteTrade } from "../services/trades";
import "../styles/BuyTrade.css";

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

          {/* {trades &&
            trades.map((trade, idx) => {
              return ( */}
          <div>
            <table id="StockInfo">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Purchase Price</th>
                  <th>Symbol</th>
                  <th>No. of Shares</th>
                  <th>Purchase Date</th>
                  <th>Trade Value</th>
                  <th>Sell</th>
                </tr>
              </thead>
              <tbody>
                {trades &&
                  trades.map((trade, idx) => {
                    return (
                      <tr>
                        <th>{trade.name}</th>
                        <th>{trade.price}</th>
                        <th>{trade.ticker}</th>
                        <th>{trade.volume}</th>
                        <th>{trade.transaction_date}</th>
                        <th>{trade.price * trade.volume}</th>
                        <th>
                          <Button
                            onClick={() => {
                              deleteTrade(trade.id);
                              setRefresh(false);
                              setRedirect(true);
                            }}
                          >
                            Sell
                          </Button>
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
}




 
  
export default Trades;
