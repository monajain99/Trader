import React, { useState, useEffect } from "react";
import axios from "axios";
import { addTrade } from "../services/trades";
import "../styles/BuyTrade.css";
import {
  Form,
  Jumbotron as Jumbo,
  Container,
  Button,
  Row,
  Col,
} from "react-bootstrap";

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
      console.log(responseData.latestPrice);
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
      <div className="bg_lt">
        {/* <div class="sellBox" style="Width: 50px">Height:25%</div> */}
        {/* <Container-small> */}
        <Row>
          <Col>
            <p className="display-" style={{ color:'grey'}}>
              BUY STOCKS
            </p>
          </Col>
        </Row>
        <Form onSubmit={createTrade}>
          <Form.Label>Stock Symbol </Form.Label>
          <Row>
            <Col lg={10}>
              <Form.Control name="ticker" type="text" onChange={updateTicker} />
            </Col>
          </Row>
          <button type="button" onClick={getPrice}>
            Get Price
          </button>
          <div>Last Trade Price {price}</div>

          {/* <Form.Label>Buy Price </Form.Label>
          <Row>
            <Col lg={2}>
              <Form.Control
                name="price"
                type="integer"
                onChange={updatePrice}
              />
            </Col>
          </Row> */}
          <Form.Label>Volume </Form.Label>
          <Row>
            <Col lg={10}>
              <Form.Control
                name="volume"
                type="integer"
                placeholder="ex. 100"
                onChange={updateVolume}
              />
            </Col>
          </Row>
          <Button type="submit">Buy</Button>
        </Form>
        {/* </Container-small> */}
      </div>
    </>
  );
}

export default AddTrade;
