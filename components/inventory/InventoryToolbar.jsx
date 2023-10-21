import React from "react";

const InventoryToolbar = () => {
  return (
    <div className="flex flex-row justify-between  p-1  border-cyan-400">
      <div className="">
        <select
          id="action-dropdown"
          className="bg-white border rounded px-2 py-1"
        >
          <option value="action1">Action 1</option>
          <option value="action2">Action 2</option>
          <option value="action3">Action 3</option>
        </select>
      </div>

      <div className="">
        <label htmlFor="search-input" className="mr-2">
          Search:
        </label>
        <input
          type="text"
          id="search-input"
          className="bg-white border rounded px-2 py-1"
          placeholder="Enter search term"
        />
      </div>
    </div>
  );
};

export default InventoryToolbar;
