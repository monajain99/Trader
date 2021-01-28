import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTrade from "./CreateTrade";
import Loader from "react-loader-spinner";
import { deleteTrade } from "../services/trades";
import "../styles/BuyTrade.css";
import numeral from "numeral";
import { Table, Card, CardBody, CardTitle, Button, CardText } from "reactstrap";

const Trades = ({ accountId, currentUserId, setRefresh }) => {
  const [trades, setTrades] = useState([]);
  const [prices, setPrices] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [refeshFromBuy, setRefeshFromBuy] = useState("");

  let array = [];
  // trades.map((trade) => console.log(trade.ticker));

  useEffect(() => {
    (async () => {
      const data = await axios.get(`/api/trade/${currentUserId}`);
      setTrades(data.data.trade_items);
      setRefresh(false);
      setRedirect(false);
      console.log(trades);
    })();
  }, [redirect, refeshFromBuy]);

  useEffect(() => {
    console.log(trades);
    Promise.all(
      trades.map((trade) => {
        return fetch(
          // `https://sandbox.iexapis.com/stable/stock/${trade.ticker}/quote?displayPercent=true&token=Tpk_a72f593783e9451990a7e3a0fceb28e5`

          `https://cloud.iexapis.com/stable/stock/${trade.ticker}/quote?displayPercent=true&token=pk_507026b3e85f4e4a889d2c112c20b532`
        ).then((res) => res.json());
      })
    ).then((data) => {
      console.log(data);
      setPrices(data);
      setRefresh(false);
      setRedirect(false);
    });
  }, [trades, redirect, refeshFromBuy]);

  

  if (!trades)
    return (
      <AddTrade
        accountId={accountId}
        setRefeshFromBuy={setRefeshFromBuy}
        setRefresh={setRefresh}
      />
    );
  if (prices.length ==0) {
   return (
     <div>
       <Card className="trades_table stock_table">
         <Loader
           type="Bars"
           color="#3988C7"
           height={40}
           width={40}
           timeout={3000}
       />
       <CardText> Sorry Portfolio not available Please try again later</CardText>
         
       </Card>
     </div>
   );
 }
  return (
    
    <div className="trade_wrapper">
      <div className="trades">
        <Card className="trades_table stock_table">
          <CardBody>
            <Table responsive>
              <CardTitle className="card_title">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Purchase Price</th>
                    <th>QUANTITY</th>
                    <th>CURRENT VALUE</th>
                    <th>GAIN/LOSS ($)</th>
                    <th>Sell</th>
                  </tr>
                </thead>
                <tbody>
                  {trades &&
                    trades.map((trade, idx) => {
              
                      return (
                        <tr>
                          {/* {key = idx} */}
                          <td className="card_subtitle">{trade.name}</td>
                          <td className="number">
                            ${numeral(Number(trade.price)).format("( 0.00)")}
                          </td>
                          <td className="number">
                            {numeral(Number(trade.volume)).format("( 0)")}
                          </td>
                          <td className="number">
                            $
                            {numeral(
                              Number(prices[idx].latestPrice * trade.volume)
                            ).format("(0.00)")}
                            {/* {console.log("..rashmi1...")}
                                {console.log(array)}
                                {console.log(array.length)}
                                {console.log(array[idx])}
                                {console.log("..rashmi2...")} */}
                          </td>
                          <td className="number"> 
                            $
                            {numeral(
                              Number(prices[idx].latestPrice * trade.volume) -
                                trade.price * trade.volume
                            ).format("( 0.00)")}
                          </td>
                          <td>
                            <Button
                              className="btn-icon btn-simple edit_button"
                              size="sm"
                              onClick={() => {
                                deleteTrade(trade.id);
                                setRefresh(false);
                                setRedirect(true);
                              }}
                            >
                              {" "}
                              <i className="fa fa-edit edit_icon" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </CardTitle>
            </Table>
          </CardBody>
        </Card>
        <div>
          <AddTrade
            accountId={accountId}
            setRefeshFromBuy={setRefeshFromBuy}
            setRefresh={setRefresh}
          />
        </div>
      </div>
    </div>
  );
};

export default Trades;
