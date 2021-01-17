import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Chart.css"
import { CanvasJSChart } from "canvasjs-react-charts";
import News from "../components/News"
import { config } from "../services/config";

import { CanvasJSReact } from "./canvasjs.react");
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Line = ({ stockData }) => {
  const { symbol } = useParams();
  const key = config.API_KEY;


  return (
    <>
    <container className="chartContainer">
      <CanvasJSChart
        options={{
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
              text: `Line Chart ${symbol}`,
              fontFamily: "times new roman",
            },
      axisY: {
        title: "Bounce Rate",
        suffix: "%",
      },
      axisX: {
        title: "Week of Year",
        prefix: "W",
        interval: 2,
      },
      data: [
        {
          type: "line",
          toolTipContent: "Day {x}: {y}%",
          dataPoints:stockData.map((stockData) => ({
            x: new Date(stockData.date),
            // The OHLC for the data point
            // The order is IMPORTANT!
            y: [
              stockData.close
            ],
                })),
              },
            ],
          }}
        />
    </container>
    </>
  );
      
};
  
export default Line;

