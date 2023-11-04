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
      <option value="purchaseOrderNumber">PO Number</option>
      <option value="carrier">Carrier</option>
      <option value="trailerNumber">Trailer Number</option>
      <option value="driverPhoneNumber">Driver Phone</option>
      <option value="status">Status</option>
      <option value="driverName">Driver Name</option>
      <option value="loaderName">Operator</option>
      <option value="assignedDoor">Dock Door</option>
    </select>
  );
};

export default SearchModifierDropdown;
