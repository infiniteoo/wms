"use client";
import { useState } from "react";
import "./Toolbar.css"; // Import your CSS file for custom styling
import Config from "./config/Config";
import Inventory from "./inventory/Inventory";
import Receiving from "./receiving/Receiving";
import Shipping from "./shipping/Shipping";
import System from "./system/System";

const Toolbar = ({  }) => {
  const [activeTab, setActiveTab] = useState("INVENTORY");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "INVENTORY":
        return <Inventory />;
      case "SHIPPING":
        return <Shipping />;
      case "RECEIVING":
        return <Receiving />;
      case "SYSTEM":
        return <System />;
      case "CONFIG":
        return <Config />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row justify-center ">
      <div className="flex flex-col justify-center items-center">
        <ul className="menu flex flex-row space-x-4 ">
          <li
            className={activeTab === "INVENTORY" ? "active" : ""}
            onClick={() => handleTabClick("INVENTORY")}
          >
            INVENTORY
          </li>
          <li
            className={activeTab === "SHIPPING" ? "active" : ""}
            onClick={() => handleTabClick("SHIPPING")}
          >
            SHIPPING
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

export default Toolbar;
