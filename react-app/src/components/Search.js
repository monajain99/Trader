import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchInput = (props) => {
  const [value, setValue] = useState("");
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/news/${value}`);

  };

  return (
    <form className="searchForm" onSubmit={handleSearch}>
      <input
        id="searchInput"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="🔍 Research Stock"
      ></input>
      <button className="searchBtn" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
