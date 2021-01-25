import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTrade from "./CreateTrade"
import MostActive from "./MostActive";
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
  const [currentPrice, setCurrentPrice] = useState("");

    // trades.map((trade) => console.log(trade.ticker));


  useEffect(() => {
    (async () => {
      const data = await axios.get(`/api/trade/${currentUserId}`);
      setTrades(data.data.trade_items);
      setRefresh(false);
      setRedirect(false);
      
    })();
  }, [redirect, refeshFromBuy]);

  async function getCurPrice(ticker)  {
     const response = await fetch(
        `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?displayPercent=true&token=Tpk_a72f593783e9451990a7e3a0fceb28e5`
      );
      const responseData = await response.json();
      return(responseData.latestPrice);
  }  


  const getPrice  = async (ticker) => {
      const response = await fetch(
        `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?displayPercent=true&token=Tpk_a72f593783e9451990a7e3a0fceb28e5`
      );
      const responseData = await response.json();
      return(responseData.latestPrice);
    }
  
  //  getPrice('tsla')


  if (!trades) return (
    <AddTrade
      accountId={accountId}
      setRefeshFromBuy={setRefeshFromBuy}
      setRefresh={setRefresh}
    />
  )
  if (trades) {
    // console.log(getPrice('tsla'))
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
                  <th>SYMBOL</th>
                  <th>QUANTITY</th>
                  <th>CURRENT VALUE</th>
                  <th>GAIN/LOSS ($)</th>
                  <th>Sell</th>
                </tr>
              </thead>
              <tbody>
                {trades &&
                  trades.map((trade, idx) => {
                  /*setCurrentPrice(getPrice(trade.ticker)); */
                    return (
                      <tr>
                        {/* {key = idx} */}
                        
                        <th>{trade.name}</th>
                        <th>{trade.price}</th>
                        <th>{trade.ticker}</th>
                        <th>{trade.volume}</th>
                        <th>{trade.volume}</th>
                        <th>${trade.price * trade.volume}</th>
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
          <MostActive/>
        </div>
        
      </>
    );
  };
}




 
  
export default Trades;
