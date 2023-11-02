import React from "react";

const SearchModifierDropdown = ({ inventory, setModifier, modifier }) => {
  const handleChange = (event) => {
    setModifier(event.target.value);
    console.log(event.target.value);
  };
  return (
    <select
      id="action-dropdown"
      className="bg-white border rounded px-2 py-1"
      onChange={handleChange}
      defaultValue=""
    >
      <option value="" disabled hidden>
        Modifier
      </option>
      <option value="po_number">PO Number</option>
      <option value="carrier">Carrier</option>
      <option value="trailer_number">Trailer Number</option>
      <option value="created_by">Created By</option>
      <option value="status">Status</option>
      <option value="completed">Complete</option>
      <option value="updated_by">Updated By</option>
    </select>
  );
};

export default SearchModifierDropdown;
