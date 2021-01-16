import React, { useState, useEffect } from "react";
import axios from "axios";
const apiKey = "d3a68d3a93a54948a016a1553bc4d20c";



const News = () => {
  const [data, setData] = useState();
  
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://newsapi.org/v2/everything?q=rich&from=2020-07-19&sortBy=publishedAt&apiKey=${apiKey}`
      );
      console.log(response);
    })();
  }, []);

  return (
    <div>
      <h1>News</h1>
    </div>
  );
};

export default News;
