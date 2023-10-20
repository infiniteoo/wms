"use client";
import { useState } from "react";
import "./Inventory.css"; // Import your CSS file for custom styling
import DisplayInventory from "./DisplayInventory";

const Inventory = ({}) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return null;
      case "database":
        return <DisplayInventory/>;
      case "tab3":
        return null;
      case "tab4":
        return null;
      case "tab5":
        return null;
      default:
        return 
    }
  };

  return (
    <div className="flex flex-row justify-start ">
      <div className="flex flex-col justify-start ">
        <ul className="menu flex flex-row space-x-4 ">
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
          <li
            className={activeTab === "RECEIVING" ? "active" : ""}
            onClick={() => handleTabClick("RECEIVING")}
          >
            RECEIVING
          </li>
          <li
            className={activeTab === "SYSTEM" ? "active" : ""}
            onClick={() => handleTabClick("SYSTEM")}
          >
            SYSTEM
          </li>
          <li
            className={activeTab === "CONFIG" ? "active" : ""}
            onClick={() => handleTabClick("CONFIG")}
          >
            CONFIG
          </li>
        </ul>

        <div className="flex flex-col font-bold">
          <div className="tab-content">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
