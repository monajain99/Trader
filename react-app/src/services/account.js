export const getAccount = async ({ user_id }) => {
  
  const response = await fetch(`/api/account/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// get Trades
// api/trade/{'<account:id>'}

// add trade POST
// api/trade

// delete trade DELETE
// api/trade