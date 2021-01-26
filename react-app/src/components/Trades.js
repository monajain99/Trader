import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTrade from "./CreateTrade"
import MostActive from "./MostActive";
import { deleteTrade } from "../services/trades";
import "../styles/BuyTrade.css";
import numeral from "numeral";
import {
  Table,
  Card,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";


const Trades = ({ accountId, currentUserId, setRefresh }) => {
  const [trades, setTrades] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [refeshFromBuy, setRefeshFromBuy] = useState("");

  let array = []
    // trades.map((trade) => console.log(trade.ticker));


  useEffect(() => {
    (async () => {
      const data = await axios.get(`/api/trade/${currentUserId}`);
      setTrades(data.data.trade_items);
      setRefresh(false);
      setRedirect(false);
      
    })();
  }, [redirect, refeshFromBuy]);

  // async function getCurPrice(ticker)  {
  //    const response = await fetch(
  //       `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?displayPercent=true&token=Tpk_a72f593783e9451990a7e3a0fceb28e5`
  //     );
  //     const responseData = await response.json();
  //     return(responseData.latestPrice);
  // }  


  const getPrice  = async (ticker) => {
      const response = await fetch(
        `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?displayPercent=true&token=Tpk_a72f593783e9451990a7e3a0fceb28e5`
      );
      const responseData = await response.json();
      return(responseData.latestPrice);
    }
  


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
       
          {/* {trades &&
            trades.map((trade, idx) => {
              return ( */}

          <div>
            <Card
              className="stock_card stock_table"
              style={{ width: "35rem", color: "grey" }}
            >
              <CardBody>
                <Table responsive>
                  <CardTitle
                    className="card_title"
                    style={{ color: "grey", fontSize: 13 }}
                  >
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
                      {
                        trades &&
                        trades.map((trade, idx) => {
                        {
                          {
                              (async () => {
                        const response = await getPrice(trade.ticker);
                        array[idx] = response
                         console.log("this is the array", array)
                         console.log("this is the index", array[idx], idx);
                      })();
                          }
                          }
                          return (
                            <tr>
                              {/* {key = idx} */}
                              <td
                                className="card_subtitle"
                                style={{ color: "grey", fontSize: 13 }}
                              >
                                {trade.name}
                              </td>
                              <td
                                className="number"
                                style={{ color: "grey", fontSize: 13 }}
                              >
                                $
                                {numeral(Number(trade.price)).format("( 0.00)")}
                              </td>
                              <td
                                className="number"
                                style={{ color: "grey", fontSize: 13 }}
                              >
                                {numeral(Number(trade.volume)).format("( 0)")}
                              </td>
                              <td
                                className="number"
                                style={{ color: "grey", fontSize: 13 }}
                              >
                                $
                                {numeral(
                                  Number(trade.price * trade.volume)
                                ).format("(0.00)")}
                                {console.log("..rashmi1...")}
                                {console.log(array)}
                                {console.log(array.length)}
                                {console.log(array[idx])}
                                {console.log("..rashmi2...")}
                              </td>
                              <td
                                className="number"
                                style={{ color: "grey", fontSize: 13 }}
                              >
                                $
                                {numeral(
                                  Number(trade.price * trade.volume) -
                                    trade.price * trade.volume
                                ).format("( 0.00)")}
                              </td>
                              <td>
                                <Button
                                  className="btn-icon btn-simple"
                                  color="info"
                                  size="sm"
                                  onClick={() => {
                                    deleteTrade(trade.id);
                                    setRefresh(false);
                                    setRedirect(true);
                                  }}
                                >
                                  {" "}
                                  <i className="fa fa-edit" />
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
      </>
    );
  };
}




 
  
export default Trades;
