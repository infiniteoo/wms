import React from "react";

const SearchModifierDropdown = ({ inventory }) => {
  return (
    <select id="action-dropdown" className="bg-white border rounded px-2 py-1">
      <option value="action1">item_number</option>
      <option value="action2">description</option>
      <option value="action3">lpn_number</option>
      <option value="action3">lot_number</option>
      <option value="action3">status</option>
      <option value="action3">location</option>
    </select>
  );
};

export default SearchModifierDropdown;
