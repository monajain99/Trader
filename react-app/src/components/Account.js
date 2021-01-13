import React, { useState, useEffect } from "react";
import alpacaApi from "../services/trade";

import "bootstrap/dist/css/bootstrap.min.css";

const Account = () => {
  const [user, setUser] = useState({});
  const [buying_power, setBuying_power] = useState([]);
  const [cash, setCash] = useState([0]);
  const [long_market_value, setLong_market_value] = useState([0]);
  const [portfolio_value, setPortfolio_value] = useState([0]);

  useEffect(() => {
    const api = alpacaApi();

    api.getAccount().then((response) => {
      const data = response.data;

      if (response.ok) {
        setBuying_power(data.buying_power);
        setCash(data.cash);
        setLong_market_value(data.long_market_value);
        setPortfolio_value(data.portfolio_value);
      }
    });
  }, []);

  return (
    <div>
      Buying power {buying_power}
      <div>Cash {cash}</div>
      PortFolio Value
      {portfolio_value}
    </div>
  );
};

export default Account;

