import { useState } from "react";
import "./Tools.css";
import DockActivity from "./DockActivity/DockActivity";
import Appointments from "./Appointments/Appointments";
import Schedule from "./Schedule/Schedule";
import Paperwork from "./Paperwork/Paperwork";

const Tools = ({}) => {
  const [activeTab, setActiveTab] = useState("dock_activity");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dock_activity":
        return <DockActivity />;
      case "appointments":
        return <Appointments />;
      case "schedule":
        return <Schedule />;
      case "paperwork":
        return <Paperwork />;
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
            className={activeTab === "dock_activity" ? "active" : ""}
            onClick={() => handleTabClick("dock_activity")}
          >
            dock activity
          </li>
          <li
            className={activeTab === "appointments" ? "active" : ""}
            onClick={() => handleTabClick("appointments")}
          >
            appointments
          </li>
          {
            <li
              className={activeTab === "schedule" ? "active" : ""}
              onClick={() => handleTabClick("schedule")}
            >
              schedule
            </li>
          }

          <li
            className={activeTab === "paperwork" ? "active" : ""}
            onClick={() => handleTabClick("paperwork")}
          >
            paperwork
          </li>
        </ul>
      </div>
      <div className="">
        <div className=" ">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Tools;
