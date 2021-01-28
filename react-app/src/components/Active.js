import React, { useState, useEffect } from "react";
import numeral from "numeral";
import Loader from "react-loader-spinner";
import { Card, CardBody, CardTitle, CardText, CardLink } from "reactstrap";

function Active() {
  const [activeStock, setActiveStock] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://sandbox.iexapis.com/stable/stock/market/list/mostactive?&token=Tpk_a72f593783e9451990a7e3a0fceb28e5`
        // `https://cloud.iexapis.com/stable/stock/market/list/mostactive?&token=pk_507026b3e85f4e4a889d2c112c20b532`
      );
      const responseData = await response.json();
      setActiveStock(responseData);
      console.log(responseData)
    }
    fetchData();
  }, []);

  if (!activeStock) {
    return (
      <div>
        <Loader
          type="Puff"
          color="#3988C7"
          height={100}
          width={100}
        />
      </div>
    );
  }

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
