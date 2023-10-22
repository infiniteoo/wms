import React from "react";

const ActionDropdown = ({
  actionModifier,
  setActionModifier,
  selectedRows,
  setIsOpen,
}) => {
  const handleAddItem = () => {
    setIsOpen(true);
    // open modal to add item
  };
  const handleDeleteItem = () => {
    console.log("delete item");
  };
  const handleEditItem = () => {
    console.log("edit item");
  };

  const handleChange = (event) => {
    setActionModifier(event.target.value);
    switch (event.target.value) {
      case "edit":
        console.log("Edit item");
        handleEditItem();
        break;
      case "add":
        console.log("Add item");
        handleAddItem();
        break;
      case "delete":
        console.log("Delete item");
        handleDeleteItem();
        break;
      default:
        console.log("No action selected");
    }
  };
  return (
    <select
      id="action-dropdown"
      className="bg-white border rounded px-2 py-1"
      onChange={handleChange}
      defaultValue=""
    >
      <option value="" disabled defaultValue hidden>
        Actions
      </option>
      <option value="edit">Edit Item</option>
      <option value="add">Add Item</option>
      <option value="delete">Delete Item</option>
    </select>
  );
  s;
};

export default ActionDropdown;
