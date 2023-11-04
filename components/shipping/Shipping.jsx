"use client";
import { useState } from "react";
import "./Shipping.css"; // Import your CSS file for custom styling
import ShippingDashboard from "./ShippingDashboard";
import Orders from "./Orders";
import Drivers from "./../shared/driver_check_in/Drivers";

const Shipping = ({}) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <ShippingDashboard />;
      case "orders":
        return <Orders />;
      case "driver check-in":
        return <Drivers />;
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
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => handleTabClick("orders")}
          >
            orders
          </li>
          <li
            className={activeTab === "driver check-in" ? "active" : ""}
            onClick={() => handleTabClick("driver check-in")}
          >
            driver check-in
          </li>
          {/*
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
          </li> */}
        </ul>
      </div>
      <div className="">
        <div className=" ">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Shipping;
