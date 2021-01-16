// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import alpacaApi from "../services/trades";
// import { getAccount } from "../services/account";
// import Trades from "./Trades";

// const Account = ({ setAuthenticated, currentUser, currentUserId }) => {
//   // console.log(currentUserId);
//   const [loaded, setLoaded] = useState(false);
//   const [accountBalance, setAccountBalance] = useState();
//   const [accountId, setAccountId] = useState("");
//   const [portfolio, setPortfolio] = useState();

//   useEffect(() => {
//     (async () => {
//       const response = await axios.get(`/api/account/${currentUserId}`);
//       const data = response.data;

//       console.log(data);
//       setAccountBalance(data.balance.balance);
//       setAccountId(data.balance.id);
//       setLoaded(true);
//     })();
//   }, []);

//   // if (!loaded) return null;

//   return (
//     <div>
//       Buying power {accountBalance}
//       <Trades currentUserId={currentUserId} accountId={accountId} />
//     </div>
//   );
// };

// export default Account;
