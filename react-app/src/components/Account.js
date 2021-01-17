import React, { useState, useEffect } from "react";
import axios from "axios";
import Trades from "./Trades"

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
    <div>
      Buying power {accountBalance}
      <Trades
        currentUserId={currentUserId}
        accountId={accountId}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default Account;
