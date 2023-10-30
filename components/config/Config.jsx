import { useState } from "react";
import "./Config.css"; // Import your CSS file for custom styling
import Variables from "./Variables";
import DockDoors from "./DockDoors";

const Config = ({}) => {
  const [activeTab, setActiveTab] = useState("variables");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "variables":
        return <Variables />;
      case "dock doors":
        return <DockDoors />;
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
            className={activeTab === "variables" ? "active" : ""}
            onClick={() => handleTabClick("variables")}
          >
            variables
          </li>
          <li
            className={activeTab === "dock doors" ? "active" : ""}
            onClick={() => handleTabClick("dock doors")}
          >
            dock doors
          </li>
        </ul>
      </div>
      <div className="">
        <div className=" ">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Config;
