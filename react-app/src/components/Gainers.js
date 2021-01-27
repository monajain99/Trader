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
  const URL = `https://cloud.iexapis.com/stable/stock/market/batch?symbols=GME,PBI&types=quote,chart&range=1d&last=5&token=pk_6f789411fea3492293da22e99ff8d631`;

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
              tickLength: 1,
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
          title: "none",
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
              shadow: "rgba(2, 255, 196, 0.406)",
            },
          },
          chart: {
            height: 175,
            width: 425,
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
                linearGradient: { x1: 0, x2: 2, y1: 2, y2: 2 },
                stops: [
                  [2.5, "#7185BF"], // start
                  [3.5, "#597DC2"], // middle
                  [2, "#3366AA"], // end
                ],
              },
            },
          ],
        };
        return (
          <div>
            <div key={value.quote.symbol}>
              <div>
                <ReactHighcharts config={config} />
              </div>
              <CardTitle className="card_title">{value.quote.symbol}</CardTitle>
              <CardText className="card_subtitle">
                {value.quote.companyName}
              </CardText>
              <CardText className="number">
                ${numeral(Number(value.quote.latestPrice)).format("( 0.00)")}
              </CardText>
              <CardText className="positive_number">
                <i className="fas fa-long-arrow-alt-up card_icon"></i>
                {numeral(Number(value.quote.changePercent)).format("( 00.00)") *
                  100}
                %
              </CardText>
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
      <Card className="stock_card">
        <CardBody>
          <div>{showData()}</div>
        </CardBody>
      </Card>
    </>
  );
};

export default Gainers;
