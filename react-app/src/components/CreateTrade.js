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

  useEffect(() => {
    (async () => {
      const stock = await axios.get(`/api/stocks`, {
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
      transaction_date: "20202022",
    });
    setRefresh(false);
    setRefeshFromBuy(true);
  };

  const updateTicker = (e) => {
    setTicker(e.target.value);
  };
  const updatePrice = (e) => {
    setPrice(e.target.value);
  };
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
              <h1 className="display-">Buy Stocks</h1>
            </Col>
          </Row>
          <Form onSubmit={createTrade}>
            <Form.Label>Stock Symbol </Form.Label>
            <Row>
              <Col lg={2}>
                <Form.Control
                  name="ticker"
                  type="text"
                  onChange={updateTicker}
                />
              </Col>
            </Row>
            <Form.Label>Buy Price </Form.Label>
            <Row>
              <Col lg={2}>
                <Form.Control
                  name="price"
                  type="integer"
                  onChange={updatePrice}
                />
              </Col>
            </Row>
            <Form.Label>Volume </Form.Label>
            <Row>
              <Col lg={2}>
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
