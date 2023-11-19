"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Config from "./config/Config";
import Inventory from "./inventory/Inventory/Inventory";
import Receiving from "./receiving/Receiving";
import Shipping from "./shipping/Shipping";
import Tools from "./tools/Tools";

import "./Toolbar.css";

const Toolbar = ({}) => {
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
      case "TOOLS":
        return <Tools />;
      case "CONFIG":
        return <Config />;

      default:
        return null;
    }
  };

  return (
    <div className=" border-green-500 w-screen">
      <div className="flex flex-row justify-between w-full">
        <ul className="menu flex flex-row space-x-4 items-center ml-2 ">
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
            className={activeTab === "TOOLS" ? "active" : ""}
            onClick={() => handleTabClick("TOOLS")}
          >
            TOOLS
          </li>
          <li
            className={activeTab === "CONFIG" ? "active" : ""}
            onClick={() => handleTabClick("CONFIG")}
          >
            CONFIG
          </li>
        </ul>
        <div className="mr-2 pt-1">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Toolbar;
