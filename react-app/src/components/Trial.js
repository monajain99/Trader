import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
const ReactHighcharts = require("react-highcharts");

const Trial = ({ symbol }) => {
  const URL = `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=quote,chart&range=1d&last=5&token=pk_6f789411fea3492293da22e99ff8d631`;
  const [stocksData, setStocksData] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [index, setIndex] = useState(0);

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
          scales: {
            xAxes: [
              {
                display: false,
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },
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
                  "font-size": "10px",
                },
              },
            },
          ],
          theme: "light1",
          title: {
            text: `1 Day Chart for ${symbol}`,
          },
          maintainAspectRatio: false,
          responsive: true,

          hover: { mode: null },
          layout: {
            padding: {
              bottom: 15,
            },
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
          elements: {
            point: {
              radius: 0,
            },
            line: {
              borderCapStyle: "round",
              borderJoinStyle: "round",
              tension: 1,
            },
          },
          chart: {
            height: 350,
            width: 950,
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
          <div key={value.quote.symbol}>
            <div>
              <div>{value.quote.symbol}</div>
              <div>{value.quote.companyName}</div>
            </div>
            <div>
              <div>
                <div className="chart__Container">
                  <ReactHighcharts config={config} />
                </div>
                <div>
                  <button type="button">{value.quote.latestPrice}</button>
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

  return (
    <div>
      <div></div>
      <div>{showData()}</div>
      <div></div>
    </div>
  );
};

export default Trial;
