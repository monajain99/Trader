import axios from "axios";

export const deleteTrade = async (id) => {
  const response = await axios.delete(`/api/trade/`, { data: { id: id } });
  return response.data;
};

export const addTrade = async (data) => {
  // console.log("this is trade data", data);
  const response = await axios.create(`/api/trade/`, {
    data: {
      // "id": account_id,
      // "name": name,
      // "ticker": ticker,
      // "price": price,
      // "volume": volume,
      // "stock_id": stock_id,
      // "transaction_date": transaction_date
    },
  });
  return response.data;
};
