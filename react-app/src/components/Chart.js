import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Chart.css"
import { CanvasJSChart } from "canvasjs-react-charts";
import News from "../components/News"
import { config } from "../services/config";


const Chart = ({ authenticated, setAuthenticated }) => {
  const [stockData, setStockData] = useState([]);
  const { symbol } = useParams();
  const key = config.API_KEY;
  
  useEffect(() => {
    const fetchStockData = async () => {
      const data = axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${key}`
      );
      const result = await data;
      setStockData(formatStockData(result.data["Time Series (Daily)"]));
    };
    fetchStockData();
  }, [symbol]);


    const set = stockData.map((stockData) => ({
            x: new Date(stockData.date),
            y: [
              stockData.close
            ],
    }))
  
  console.log(set)

  return (
    <>
      <div className="chart__Container">
        <CanvasJSChart
          options={{
            theme: "light1",
            title: {
              text: `Customized Candle Stick Chart ${symbol}`,
              fontFamily: "times new roman",
            },
            zoomEnabled: true,
            exportEnabled: true,
            axisY: {
              minimum: Math.min(...stockData.map((data) => data.low)) / 1.1,
              maximum: Math.max(...stockData.map((data) => data.high)) * 1.1,
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
              },
              includeZero: false,
              title: "Prices",
              prefix: "$ ",
            },
            axisX: {
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
              },
              interval: 2,
              intervalType: "month",
              valueFormatString: "MMM-YY",
              labelAngle: -45,
            },
            data: [
              {
                type: "candlestick",
                risingColor: "orange",
                color: "#6b9ba5ff",
                dataPoints: stockData.map((stockData) => ({
                  x: new Date(stockData.date),
                  y: [
                    stockData.open,
                    stockData.high,
                    stockData.low,
                    stockData.close,
                  ],
                })),
              },
            ],
          }}
        />
      </div>
      <div>
        {/* <container className="line__Container">
        <CanvasJSChart
          options={{
            zoomEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            title: {
              text: `Line Chart ${symbol}`,
              fontFamily: "times new roman",
            },
            axisY: {
             crosshair: {
                enabled: true,
                snapToDataPoint: true,
              },
              includeZero: false,
              title: "Prices",
              prefix: "$ ",
            },
            axisX: {
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
              },
              interval: 2,
              intervalType: "month",
              valueFormatString: "MMM-YY",
              labelAngle: -45,
            },
            data: [
              {
                type: "line",
                toolTipContent: "Day {x}: {y}%",
                dataPoints: stockData.map((stockData) => ({
                  x: new Date(stockData.date),
                  // The OHLC for the data point
                  // The order is IMPORTANT!
                  y: [stockData.close],
                })),
              },
            ],
          }}
        />
      </container> */}
      </div>
      <News symbol={symbol} />
    </>
  );
      
};


function formatStockData(stockData) {
    // Convert stockData from an object to an array
    return Object.entries(stockData).map(entries => {
        const [date, priceData] = entries;

        return {
            date,
            open: Number(priceData['1. open']),
            high: Number(priceData['2. high']),
            low: Number(priceData['3. low']),
            close: Number(priceData['4. close'])
        }
    });
}

export default Chart;


