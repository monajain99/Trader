// const NewsAPI = require("newsapi");
// const newsapi = new NewsAPI("97e44a617dc04d7a95e7cd8946263102");

// async function getArticles(companyName) {
//   try {
//     const response = await newsapi.v2.everything({
//       q: `${companyName} stock`,
//       sources: "bloomberg, business-insider, the-verge",
//       domains: "bloomberg.com, businessinsider.com, theverge.com",
//       from: Date.now() - 1 * 24 * 60 * 60 * 1000,
//       to: Date.now(),
//       language: "en",
//       sortBy: "relevancy",
//       page: 1,
//     });

//     return response;
//   } catch (error) {
//     console.log("error >>> ", error);
//   }
// }

// export default getArticles;
