import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SearchTextInput = ({ inventory, setInventory, modifier }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Trigger search when Enter key is pressed
      performSearch(searchTerm);
    }
  };
  const yourSearchFunction = async (inventory, term, modifier) => {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq(modifier, searchTerm);
    if (error) {
      console.error(error);
    } else {
      if (inventory.length > 0) {
        setInventory(data);
      }
    }
  };

  const performSearch = async (term) => {
    // Implement your search logic here using the "term" and "modifier" if needed
    // Update the inventory state+-based on the search results
    const filteredInventory = await yourSearchFunction(inventory, term, modifier);
    setInventory(filteredInventory);
  };

  return (
    <input
      type="text"
      id="search-input"
      className="bg-white border rounded px-2 py-1 ml-2"
      placeholder="Enter search term"
      onChange={handleChange}
      onKeyPress={handleKeyPress} // Handle Enter key press
      value={searchTerm}
    />
  );
};

export default SearchTextInput;
