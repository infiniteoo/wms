import React from "react";

const ActionDropdown = ({
  actionModifier,
  setActionModifier,
  selectedRows,
  setIsOpen,
  setSelectedRows,
  setItemToDelete,
  setShowDeleteModal,
}) => {
  const handleAddItem = () => {
    setSelectedRows([]);
    setActionModifier("");
    setIsOpen(true);

    // open modal to add item
  };
  const handleDeleteItem = async () => {
    if (selectedRows.length === 0) {
      alert("please select an item to archive");
      setActionModifier("");
      return;
    }
    setActionModifier("");
    setItemToDelete(selectedRows);
    setShowDeleteModal(true);
  };
  const handleEditItem = () => {
    if (selectedRows.length > 1) {
      alert("sorry, you can only edit one item at a time");
      setActionModifier("");
    } else if (selectedRows.length === 1) {
      // open modal to edit item
      setIsOpen(true);
      setActionModifier("");
    } else {
      alert("please select an item to edit");
      setActionModifier("");
    }
  };

  const handleChange = (event) => {
    setActionModifier(event.target.value);
    switch (event.target.value) {
      case "edit":
        console.log("Edit Appointments");
        handleEditItem();
        break;

      case "delete":
        console.log("Archive Appointments");
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
      value={actionModifier}
    >
      <option value="" disabled defaultValue hidden>
        Actions
      </option>
      <option value="edit">Edit Appointment</option>

      <option value="delete">Archive Appointment</option>
    </select>
  );
};

export default ActionDropdown;
