import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Chart.css"
import { CanvasJSChart } from "canvasjs-react-charts";
import News from "../components/News"
import { config } from "../services/config";

import { CanvasJSReact } from "./canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Line = ({ stockData }) => {
  const { symbol } = useParams();
  const key = config.API_KEY;
  const [xvalue, setXvalue] = useState([]);
  const [yvalue, setYvalue] = useState([]);
  
  useEffect(() => {
    const fetchStockData = async () => {
      const data = axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${key}`
      );
      const result = await data;
      setStockData(formatStockData(result.data["Time Series (Daily)"]));
    };
    fetchStockData();
  }, [symbol]);



  return (
    <div>
    <container className="chartContainer">
      <CanvasJSChart
        const options = {{
			theme: "light2",
			title: {
				text: "Stock Price of NIFTY 50"
			},
			axisY: {
				title: "Price in USD",
				prefix: "$"
			},
			data: [{
				type: "line",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.00",
				dataPoints:stockData.map((stockData) => ({
            x: new Date(stockData.date),
            y: [
              stockData.close
            ],
                })),
              },
            ],
          }}
        />
    </container>
    </div>
  );
      
};
  
// export default Line;

