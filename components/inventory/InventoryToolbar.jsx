import React, { useState } from "react";
import ActionDropdown from "./ActionDropdown";
import SearchModifierDropdown from "./SearchModifierDropdown";
import SearchTextInput from "./SearchTextInput";

const InventoryToolbar = ({ inventory, setInventory }) => {
  const [modifier, setModifier] = useState("");
 
  return (
    <div className="flex flex-row justify-between  p-1  border-cyan-400">
      <div className="">
        <ActionDropdown />
      </div>

      <div className="">
        <SearchModifierDropdown inventory={inventory} setModifier={setModifier} />
        <SearchTextInput inventory={inventory} setInventory={setInventory} modifier={modifier}/>
      </div>
    </div>
  );
};

export default InventoryToolbar;
