import React, { useState, useEffect } from "react";
import numeral from "numeral"
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
} from "reactstrap";

function MostActive() {
  const [activeStock, setActiveStock] = useState([]);
  const [gainerStock, setGainerStock] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://sandbox.iexapis.com/stable/stock/market/list/mostactive?&token=Tpk_a72f593783e9451990a7e3a0fceb28e5`
      );
      const responseData = await response.json();
      setActiveStock(responseData);
    }
    fetchData();
  }, [activeStock]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://sandbox.iexapis.com/stable/stock/market/list/gainers?&token=Tpk_a72f593783e9451990a7e3a0fceb28e5`
      );
      const responseData = await response.json();
      setGainerStock(responseData);
    }
    fetchData();
  }, [gainerStock]);

  return (
    <>
      <div className="section_title" style={{ color: "white", fontSize: 20 }}>
        <i className="fas fa-chart-line card_icon"></i>Gainers
      </div>
      {gainerStock.map((value, index) => {
        if (index < 9) {
          return (
            <li key={index}>
              <Card
                className="stock_card"
                style={{ width: "20rem", color: "grey" }}
              >
                <CardBody>
                  <CardTitle
                    className="card_title"
                    style={{ color: "grey", fontSize: 13 }}
                  >
                    {value.symbol}
                  </CardTitle>
                  <CardText
                    className="card_subtitle"
                    style={{ color: "grey", fontSize: 13 }}
                  >
                    {value.companyName}
                  </CardText>
                  <CardText
                    className="number"
                    style={{ color: "grey", fontSize: 13 }}
                  >
                    ${numeral(Number(value.latestPrice)).format("( 0.00)")}
                  </CardText>
                  <CardText style={{ color: "#66b2b2	", fontSize: 13 }}>
                    <i className="fas fa-long-arrow-alt-up card_icon"></i>
                    {numeral(Number(value.changePercent)).format("( 0.00)")}%
                  </CardText>
                </CardBody>
              </Card>
            </li>
          );
        }
      })}
      <div className="section_title" style={{ color: "white", fontSize: 20 }}>
        <i className="fas fa-chart-line card_icon"></i>Most Active
      </div>{" "}
      {activeStock.map((value, index) => {
        if (index < 9) {
          return (
            <li key={index}>
              <h6 style={{ color: "white", fontSize: 13 }}>{value.symbol}</h6>
              <h6 style={{ color: "grey", fontSize: 13 }}>
                {value.companyName}
              </h6>
              <h6 style={{ color: "white", fontSize: 13 }}>
                ${numeral(Number(value.latestPrice)).format("( 0.00)")}
              </h6>
              <h6 style={{ color: "#66b2b2	", fontSize: 13 }}>
                {numeral(Number(value.changePercent)).format("( 0.00)")}%
              </h6>
            </li>
          );
        }
      })}
    </>
  );
}

export default MostActive;
