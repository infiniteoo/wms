import React, { useState } from "react";
import ActionDropdown from "./ActionDropdown";
import SearchModifierDropdown from "./SearchModifierDropdown";
import SearchTextInput from "./SearchTextInput";
import RefreshButton from "./RefreshButton";

const ReceivingToolbar = ({
  inventory,
  setInventory,
  searchTerm,
  setSearchTerm,
  actionModifier,
  setModifier,
  setActionModifier,
  selectedRows,
  setIsOpen,
  setSelectedRows,
  setItemToDelete,
  setShowDeleteModal,
  fetchInventory,
}) => {
  const [hideCompleted, setHideCompleted] = useState(true);

  const toggleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  const filteredInventory = hideCompleted
    ? inventory.filter((item) => !item.completed)
    : inventory;

  return (
    <div className="flex flex-row justify-between p-1 border-cyan-400">
      <div className="flex items-center">
        <ActionDropdown
          actionModifier={actionModifier}
          setActionModifier={setActionModifier}
          selectedRows={selectedRows}
          setIsOpen={setIsOpen}
          setSelectedRows={setSelectedRows}
          setItemToDelete={setItemToDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      </div>

      <div className="flex items-center">
        <div className={`switch-container mr-10 `}>
          <label
            className={`switch ${
              hideCompleted
                ? "border-2 border-green-400"
                : "border-2 border-red-400"
            }`}
          >
            <input
              type="checkbox"
              checked={hideCompleted}
              onChange={toggleHideCompleted}
              title="Hide Completed"
            />
            <span className={`slider`}></span>
          </label>
        </div>
        <RefreshButton
          setInventory={setInventory}
          fetchInventory={fetchInventory}
        />
        <SearchModifierDropdown
          inventory={filteredInventory}
          setModifier={setModifier}
        />
        <SearchTextInput
          inventory={filteredInventory}
          setInventory={setInventory}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default ReceivingToolbar;
