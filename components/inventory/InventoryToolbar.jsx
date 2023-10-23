import React, { useState } from "react";
import ActionDropdown from "./ActionDropdown";
import SearchModifierDropdown from "./SearchModifierDropdown";
import SearchTextInput from "./SearchTextInput";

const InventoryToolbar = ({
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
}) => {
  return (
    <div className="flex flex-row justify-between p-1 border-cyan-400">
      <div className="flex items-center">
        <ActionDropdown
          actionModifier={actionModifier}
          setActionModifier={setActionModifier}
          selectedRows={selectedRows}
          setIsOpen={setIsOpen}
          setSelectedRows={setSelectedRows}
        />
      </div>

      <div className="flex items-center">
        <SearchModifierDropdown
          inventory={inventory}
          setModifier={setModifier}
        />
        <SearchTextInput
          inventory={inventory}
          setInventory={setInventory}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

export default InventoryToolbar;
