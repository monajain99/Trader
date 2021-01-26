import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import News from "./News"
import Price from "./Price"

const ReactHighcharts = require("react-highcharts");

const Chart = () => {
  const [stocksData, setStocksData] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [index, setIndex] = useState(0);
  const { symbol } = useParams();
  const URL = `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=quote,chart&range=1d&last=5&token=pk_6f789411fea3492293da22e99ff8d631`;

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
              lineWidth: 0,
              minorGridLineWidth: 0,
              lineColor: "transparent",
              labels: {
                enabled: false,
              },
              minorTickLength: 0,
              tickLength: 0,
            },
          ],
          yAxis: [
            {
              gridLineWidth: 0,
              minorGridLineWidth: 0,
              labels: {
                style: {
                  fontSize: "0px",
                },
              },
            },
          ],
          theme: "light1",
          title: {
            text: `1 Day Chart for ${symbol}`,
            style: {
              color: "#FFFFFF",
              fontWeight: "bold",
            },
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
              color: "#373A46",
            },
          },
          chart: {
            height: 350,
            width: 950,
            backgroundColor: "rgba(0,0,0,0)",
          },

          credits: {
            enabled: false,
          },
          series: [
            {
              name: " ",
              data: getData(value),
              type: "spline",
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, "#7175BF"], // start
                  [3.5, "#597DC2"], // middle
                  [1, "#3366AA"], // end
                ],
              },
            },
          ],
        };
        return (
          <div className="chart__Container">
            <div key={value.quote.symbol}>
              <div>
                <ReactHighcharts config={config} />
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
    <>
      <div>{showData()}</div>
        <News symbol={symbol} />
      <Price symbol={symbol} />
    </>
  );
};

export default Chart;
