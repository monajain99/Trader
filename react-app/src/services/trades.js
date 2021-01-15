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

const public_token = "pk_ae113656c0fe4cbb8f2053e075fa29b8";
const api = axios.create({
  baseURL: "https://cloud.iexapis.com/stable",
});

export const loadQuotesForStock = (symbol) => {
  console.log("quote");
  return api
    .get(`/stock/${symbol}/quote?token=${public_token}`)
    .then((res) => res.data);
};

export const loadLogoForStock = (symbol) => {
  console.log("logo");
  return api
    .get(`/stock/${symbol}/logo?token=${public_token}`)
    .then((res) => res.data.url);
};

export const loadRecentNewsForStock = (symbol) => {
  console.log("news");
  return api
    .get(`/stock/${symbol}/news?token=${public_token}`)
    .then((res) => res.data);
};

export const loadChartForStock = (symbol, range) => {
  console.log("chart");
  return api
    .get(`/stock/${symbol}/chart/${range}?token=${public_token}`)
    .then((res) => res.data);
};

// export const getStocks = async () => {
//   const response = await fetch("/api/stocks")
//   return await response.json();
// };
