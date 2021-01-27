import React, { useState, useEffect } from "react";
import axios from "axios";
import Trades from "./Trades"
import "../styles/BuyTrade.css";
import numeral from "numeral";
import Box from "./Box"
import Gainers from "./Gainers";
import { Row, Col, Button, Container } from "react-bootstrap/";

const Account = ({ setAuthenticated, currentUser, currentUserId }) => {
  const [loaded, setLoaded] = useState(false);
  const [accountBalance, setAccountBalance] = useState();
  const [accountId, setAccountId] = useState("")
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/account/${currentUserId}`);
      const data = response.data;
      setAccountBalance(data.balance.balance);
      setAccountId(data.balance.id);
      setLoaded(true);
      setRefresh(true)
    })();
  }, [loaded, refresh]);

if (!loaded) return null;
  
  return (
    <Container className="content_wrapper">
      <Row>
        <Col className="content_wrapper2 col-xsm-12">
          <Gainers />
        </Col>
        <Col className="content_wrapper2 col-xsm-12">
          <div className="section_title user_balance">
            <i className="fas fa-gem card_icon"></i>Portfolio{"   "}
            <Button className="demoButton" type="button">
              {numeral(Number(accountBalance)).format("($ 0.000 a)")}
            </Button>
          </div>
          <Trades
            currentUserId={currentUserId}
            accountId={accountId}
            setRefresh={setRefresh}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Box />
        </Col>
      </Row>
    </Container>
  );
};

export default Account;

