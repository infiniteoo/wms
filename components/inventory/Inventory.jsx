"use client";
import { useState } from "react";
import "./Inventory.css"; // Import your CSS file for custom styling
import DisplayInventory from "./DisplayInventory";
import InventoryDashboard from "./InventoryDashboard";

const Inventory = ({}) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <InventoryDashboard />;
      case "database":
        return <DisplayInventory />;
      case "tab3":
        return null;
      case "tab4":
        return null;
      case "tab5":
        return null;
      default:
        return;
    }
  };

  return (
    <div className="flex flex-col border-black w-full">
      <div className="flex flex-row">
        <ul className="menu flex flex-row space-x-4 pl-2 ">
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => handleTabClick("dashboard")}
          >
            dashboard
          </li>
          <li
            className={activeTab === "database" ? "active" : ""}
            onClick={() => handleTabClick("database")}
          >
            database
          </li>
          
        </ul>
      </div>
      <div className="">
        <div className=" ">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Inventory;
