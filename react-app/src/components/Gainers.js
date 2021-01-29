import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import { Card, CardBody, CardTitle, CardText, CardLink } from "reactstrap";

const ReactHighcharts = require("react-highcharts");

const Gainers = () => {
  const [stocksData, setStocksData] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [index, setIndex] = useState(0);
  const URL = `https://cloud.iexapis.com/stable/stock/market/batch?symbols=AFG,PTC&types=quote,chart&range=1d&last=2&token=pk_6f789411fea3492293da22e99ff8d631`;

  const item = 2;
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
              lineWidth: 0,
              minorGridLineWidth: 0,
              lineColor: "transparent",
              labels: {
                enabled: false,
              },
              minorTickLength: 1,
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
              minorTickLength: 1,
              tickLength: 1,
            },
          ],
          title: "none",

          maintainAspectRatio: true,
          responsive: true,

          hover: { mode: null },

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
          },
          chart: {
            height: 160,
            width: 450,
            backgroundColor: "rgba(0,0,0,0)",
          },

          credits: {
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
          series: [
            {
              marker: {
                enabledThreshold: 10,
                // enabled: true
              },
              point: {
                radius: 0,
              },
              line: {
                borderCapStyle: "round",
                borderJoinStyle: "round",
                tension: 1,
              },
              shadow: {
                color: "#3788C7",
                offsetX: 0,
                offsetY: 5,
                opacity: 0.2,
                width: 5,
              },
              data: getData(value),
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0.5, "#3788C7"], // start
                  // [1, "#ffffff"], // middle
                  // [1, "#fa2307"], // end
                ],
              },
            },
          ],
        };
        return (
          <div>
            <div key={value.quote.symbol}>
              <Card className="stock_card stock_chart">
                <CardLink
                  href={`/news/${value.quote.symbol}`}
                  
                >
                  <CardBody>
                    <div>
                      <ReactHighcharts config={config} />
                    </div>
                    <CardLink className="card_title">
                      {value.quote.symbol}
                    </CardLink>
                    {/* <CardText className="card_subtitle">
                    {value.quote.companyName}
                  </CardText> */}
                    <CardLink className="number">
                      $
                      {numeral(Number(value.quote.latestPrice)).format(
                        "( 0.00)"
                      )}
                    </CardLink>
                    <CardLink className="positive_number">
                      <i className="fas fa-long-arrow-alt-up card_icon"></i>$
                      {console.log(value.quote.changePercent)}
                      {Number(value.quote.changePercent * 100).toFixed(2)}%
                    </CardLink>
                  </CardBody>
                </CardLink>
              </Card>
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
      <div className="section_title user_balance">
        <i className="fas fa-chart-line card_icon"></i>Gainers
      </div>
          <div>{showData()}</div>
    </>
  );
};

export default Gainers;
