import React, { useState, useEffect } from "react";
import numeral from "numeral";
import { Card, CardBody, CardTitle, CardText, CardLink } from "reactstrap";

function Active() {
  const [activeStock, setActiveStock] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://sandbox.iexapis.com/stable/stock/market/list/mostactive?&token=Tpk_a72f593783e9451990a7e3a0fceb28e5`
      );
      const responseData = await response.json();
      setActiveStock(responseData);
      console.log(responseData)
    }
    fetchData();
  }, [activeStock]);

  

  return (
    <>
      <div className="section_title user_balance">
        <i className="fas fa-fire card_icon"></i>Most Active
      </div>
      {activeStock.map((value, index) => {
        if (index < 9) {
          return (
            <div key={index}>
              <Card className="stock_card">
                <CardBody>
                  <CardTitle className="card_title">{value.symbol}</CardTitle>
                  <CardText className="card_subtitle">
                    {value.companyName}
                  </CardText>
                  <CardText className="number">
                    ${numeral(Number(value.latestPrice)).format("( 0.00)")}
                  </CardText>
                  <CardText className="positive_number">
                    {" "}
                    <i className="fas fa-long-arrow-alt-up card_icon"></i>
                    {numeral(Number(value.changePercent)).format("( 0.00)")}%
                  </CardText>
                </CardBody>
              </Card>
            </div>
          );
        }
      })}
    </>
  );
}

export default Active;
