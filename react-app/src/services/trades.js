import axios from "axios";
import apisauce from "apisauce";
// import config from "./config"

const API_KEY = "PK0CDPFB1RM8SA4URUGW";
const SECRET_KEY = "Z8StsoZwwKFH0TLnJL8LvMfyyI6otN7bkEocWQZe";
const BASE_URL = "https://paper-api.alpaca.markets";

export const deleteTrade = async (id) => {
  const response = await axios.delete(`/api/trade/`, { data: { 'id': id } });
  return response.data;
};

export const addTrade = async (data) => {
  console.log("this is trade data", data);
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



export const alpacaApi = (baseURL = BASE_URL) => {
  const api = apisauce.create({
    baseURL: BASE_URL,
    headers: {
      "APCA-API-KEY-ID": API_KEY,
      "APCA-API-SECRET-KEY": SECRET_KEY,
    },
    timeout: 5000,
  });

  const getAccount = () => api.get("v2/account");
  const getPositions = () => api.get("v2/positions");

  return {
    getAccount,
    getPositions,
  };
};


// export const getStocks = async () => {
//   const response = await fetch("/api/stocks")
//   return await response.json();
// };
