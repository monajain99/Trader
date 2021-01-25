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
        className="searchbar"
        id="searchInput"
        type="search"
        value={value}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search By symbol"
      ></input>
      <button className="general_button" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
