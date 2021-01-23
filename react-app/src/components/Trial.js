import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import logo from "../components/images/logo.png";
import "../styles/Trial.css";
const ReactHighcharts = require("react-highcharts");


const Trial = ({ symbol }) => {
  const URL =
    `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=quote,chart&range=1d&last=5&token=pk_6f789411fea3492293da22e99ff8d631`;
  const [stocksData, setStocksData] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [disabledNext, setDisabledNext] = useState(true);
  const [disabledPrev, setDisabledPrev] = useState(false);
  const item = 4;
  useEffect(() => {
    getStocks().then((data) => setStocksData(data));
  }, []);

  const getStocks = () => {
    return axios({
      url: URL,
      method: "GET",
    }).then((response) => {
      var resp = response.data;
      setDisplayData(
        Object.keys(resp)
          .slice(index, item)
          .map((key) => ({ [key]: resp[key] }))
      );
      return resp;
    });
  };
  const showData = () => {
    return displayData.map((data) => {
      return Object.entries(data).map(([key, value]) => {
        var config = {
          xAxis: [
            {
              labels: {
                style: {
                  "font-size": "0px",
                },
              },
            },
          ],
          yAxis: [
            {
              labels: {
                style: {
                  "font-size": "0px",
                },
              },
            },
          ],
          title: {
            text: "",
          },

          tooltip: {
            shared: true,
            formatter: function () {
              return (
                numberFormat.format(this.y, 0) +
                "</b><br/>" +
                moment(this.x).format("MMMM Do YYYY, h:mm")
              );
            },
          },
          legend: {
            enabled: false,
          },
          chart: {
            height: 150,
            width: 150,
          },
          credits: {
            enabled: false,
          },
          series: [
            {
              name: " ",
              data: getData(value),
              type: "spline",
            },
          ],
        };
        return (
          <div className="stocks" key={value.quote.symbol}>
            <div className="flex-1 stocks-text">
              <div className="flex-1">{value.quote.symbol}</div>
              <div className="flex-1">{value.quote.companyName}</div>
            </div>
            <div className="flex-2">
              <div className="chart">
                <div className="flex-2">
                  <ReactHighcharts config={config} />
                </div>
                <div className="flex-1 button">
                  <button type="button" className="btn">
                    {value.quote.latestPrice}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      });
    });
  };

  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);
  const getData = (stock) => {
    var chartData = [];
    stock.chart.map((data) => {
      const minute = data.minute;
      const date = data.date;
      const time = date + " " + minute;
      var newdate = new Date(time);
      var chart = [];
      chart.push(newdate.getTime());
      chart.push(data.high);
      chartData.push(chart);
    });
    return chartData;
  };
  const togglePrev = (e) => {
    let startIndex = index - item;
    let endindex = startIndex + item;
    let disabledNext = endindex <= Object.keys(stocksData).length - 1;
    let disabledPrev = startIndex > 1;
    setDisplayData(
      Object.keys(stocksData)
        .slice(startIndex, endindex)
        .map((key) => ({ [key]: stocksData[key] }))
    );
    setIndex(startIndex);
    setDisabledNext(disabledNext);
    setDisabledPrev(disabledPrev);
  };

  const toggleNext = (e) => {
    let startIndex = index + item;
    let endIndex = startIndex + item;
    if (startIndex >= stocksData.length) startIndex = stocksData.length;
    let disabledNext = endIndex <= Object.keys(stocksData).length - 1;
    let disabledPrev = startIndex != 0;
    setDisplayData(
      Object.keys(stocksData)
        .slice(startIndex, endIndex)
        .map((key) => ({ [key]: stocksData[key] }))
    );
    setIndex(startIndex);
    setDisabledNext(disabledNext);
    setDisabledPrev(disabledPrev);
  };

  return (
    <div
      className="stocks-card"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <div className="flex-column">
        <div className="flex-1 left-slider">
          {showButton && disabledPrev ? (
            <button
              type="submit"
              className="left"
              onClick={(e) => togglePrev(e)}
            >
              <img src={logo} width="300" height="30" alt="submit" />
            </button>
          ) : null}
        </div>
        <div className="flex-4">{showData()}</div>
        <div className="flex-1 right-slider">
          {showButton && disabledNext ? (
            <button
              type="submit"
              className="right"
              onClick={(e) => toggleNext(e)}
            >
              <img src={logo} width="30" height="30" alt="submit" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Trial;
