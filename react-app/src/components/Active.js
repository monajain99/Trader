import React, { useState, useEffect } from "react";
import numeral from "numeral";
import Loader from "react-loader-spinner";
import { Card, CardBody, CardTitle, CardText, CardLink , Col} from "reactstrap";

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
      console.log(activeStock);
    }
    fetchData();
  }, []);

        console.log(activeStock);


  if (!activeStock) {
    return (
      <div>
        <Card className="trades_table stock_table">
          <Loader
            type="Bars"
            color="#3988C7"
            height={40}
            width={40}
            timeout={3000}
          />
          <CardText> Sorry not available Please try again later</CardText>
        </Card>
      </div>
    );
  }

  return (
    <>
      
      {activeStock.map((value, index) => {
        console.log(value.changePercent, "=",Math.sign(value.changePercent) === 1);
        if (index < 9) {
          return (
            <Col className="col-4" key={index}>
              <Card className="stock_card">
                <CardLink href={`/news/${value.symbol}`}>
                  <CardBody>
                    <CardTitle className="card_title">{value.symbol}</CardTitle>
                    <CardText className="card_subtitle">
                      {value.companyName}
                    </CardText>
                    <CardLink className="number">
                      ${numeral(Number(value.latestPrice)).format("( 0.00)")}
                    </CardLink>
                    <span
                      className={
                        Math.sign(value.changePercent) === 1
                          ? "positive_number"
                          : "negative_number"
                      }
                    >
                      {" "}
                      {Number(value.change).toFixed(2)} {"  "}[
                      {Number(value.changePercent * 100).toFixed(2)}%]
                    </span>
                  </CardBody>
                </CardLink>
              </Card>
            </Col>
          );
        }
      })}
    </>
  );
}

export default Active;
