import React from "react";

const SearchTextInput = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      id="search-input"
      className="bg-white border rounded px-2 py-1 ml-2"
      placeholder="Enter search term"
      onChange={handleChange}
      value={searchTerm}
    />
  );
};

export default SearchTextInput;
