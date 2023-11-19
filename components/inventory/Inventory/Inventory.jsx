import { useState } from "react";
import DisplayInventory from "./DisplayInventory";
import InventoryDashboard from "../Dashboard/InventoryDashboard";
import Incidents from "../Incidents/Incidents.jsx";
import Labels from "../Labels/Labels.jsx";
import Timeline from "../Timeline/Timeline.jsx";

import "./Inventory.css";

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
      case "incidents":
        return <Incidents />;
      case "labels":
        return <Labels />;
      case "timeline":
        return <Timeline />;
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
          <li
            className={activeTab === "incidents" ? "active" : ""}
            onClick={() => handleTabClick("incidents")}
          >
            incidents
          </li>
          <li
            className={activeTab === "labels" ? "active" : ""}
            onClick={() => handleTabClick("labels")}
          >
            labels
          </li>
          <li
            className={activeTab === "timeline" ? "active" : ""}
            onClick={() => handleTabClick("timeline")}
          >
            timeline
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
