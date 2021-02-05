import React, { useState, useEffect } from "react";
import {
  Card,
  CardLink,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";

import "../styles/News.css";


function News ({ authenticated, setAuthenticated, symbol }) {
  const [data, setData] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://cloud.iexapis.com/stable/stock/${symbol}/news/last/${2}?token=pk_6f789411fea3492293da22e99ff8d631`
      );
      const responseData = await response.json();
      setData(responseData);
    }
    fetchData();
  }, [symbol]);


  if (!data || data == undefined)
    return <div className="newsLoading">Loading News...</div>;
  if (data) {
    return (
      <div className="news_wrapper1">
        <div className="section_title user_balance">
          <i className="fas fa-wifi card_icon"></i>News
        </div>
        {data &&
          data.map((data, idx) => {
            return (
              <>
                <div
                  className="news_wrapper"
                >
                  <Card
                    className="stock_card news_card"
                    style={{ width: "30rem", color: "grey" }}
                  >
                    <CardLink
                      href={`${data.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CardImg
                        top
                        src={data.image}
                        alt={data.image}
                        style={{ width: "8rem", height: "4rem" }}
                      />
                      <CardTitle
                        className="card_title"
                        style={{ color: "grey", fontSize: 9 }}
                      >
                        {data.headline}{" "}
                      </CardTitle>
                      <CardText
                        className="card_title"
                        style={{ color: "grey", fontSize: 10 }}
                      >
                        {data.summary}
                      </CardText>

                      <CardText
                        className="number"
                        style={{ color: "grey", fontSize: 13 }}
                      >
                        {data.source}
                      </CardText>
                    </CardLink>
                  </Card>
                </div>
              </>
            );
          })}
      </div>
    );
  }
}

export default News;
