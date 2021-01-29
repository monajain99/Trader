import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/BuyTrade.css";
import {
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import {Form} from "react-bootstrap"

function AddTrade({ setRefeshFromBuy, accountId, setRefresh }) {
  const [ticker, setTicker] = useState("");
  const [price, setPrice] = useState("");
  const [volume, setVol] = useState("");
  const [name, setName] = useState("");
  const [stock_id, setStock_id] = useState("");
  const [tradeData, setTradeData] = useState("");


  useEffect(() => {
    (async () => {
      const stock = await axios.get(`/api/stocks/`, {
        data: { ticker: ticker },
      });
      setStock_id(stock.data.stocks[0].id);
      setName(stock.data.stocks[0].name);
    })();
  }, []);

  const account_id = accountId;

  const createTrade = async (e) => {
    e.preventDefault();

    const response = await axios.post(`/api/trade/`, {
      account_id,
      ticker,
      price,
      volume,
      stock_id,
      transaction_date: "20210118",
    });
    setRefresh(false);
    setRefeshFromBuy(true);
  };


  

  const getPrice = async (e) => {
    e.preventDefault()
    const response = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${ticker}/quote?displayPercent=true&token=Tpk_a72f593783e9451990a7e3a0fceb28e5`
    );
    const responseData = await response.json();
    setPrice(responseData.latestPrice);
      // console.log(responseData.latestPrice);
  }
  
  const updateTicker = (e) => {
    setTicker(e.target.value);
  };
  // const updatePrice = (e) => {
  //   setPrice(e.target.value);
  // };
  const updateVolume = (e) => {
    setVol(e.target.value);
  };

  return (
    <>
      <div className="trades">
        <Card className="buy_form">
          <CardBody>
            <CardTitle
              className="card_title"
              // style={{ color: "grey", fontSize: 13 }}
            >
              <i className="fas fa-dollar-sign card_icon"></i>Buy Stocks
            </CardTitle>

            <form className="form" onSubmit={createTrade}>
              <div className="input_wrapper1">
                <label
                  className="card_subtitle"
                  // style={{ color: "grey", fontSize: 13 }}
                >
                  Stock Symbol{" "}
                </label>

                <input
                  name="ticker"
                  type="text"
                  placeholder="Symbol"
                  onChange={updateTicker}
                />

                <button
                  className="general_button"
                  type="button"
                  onClick={getPrice}
                >
                  Get price: {price}
                </button>
              </div>
              <div className="input_wrapper1">
                <label
                  className="card_subtitle"
                  // style={{ color: "grey", fontSize: 13 }}
                >
                  Volume{" "}
                </label>

                <input
                  name="volume"
                  type="integer"
                  placeholder="ex. 100"
                  onChange={updateVolume}
                />
                <button className="general_button" type="submit">
                  Buy
                </button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default AddTrade;
