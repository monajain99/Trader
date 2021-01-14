export const getStocks = async ( ticker ) => {
  const response = await fetch(`api/stocks/${ticker}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}
