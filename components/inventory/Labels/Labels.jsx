import { useState } from "react";

import Plaques from "./Plaques/Plaques.jsx";
import Tags from "./Tags/Tags.jsx";

import { styles } from "./Labels.styles.js";

const Labels = () => {
  const [activeTab, setActiveTab] = useState("Plaques");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Tags":
        return <Tags />;

      case "Plaques":
        return <Plaques />;

      default:
        return null;
    }
  };

  return (
    <div className="paperwork-container flex flex-row  mt-3 justify-left">
      <div
        className="labelGeneratorsBox h-100 border-gray-400 text-center"
        style={styles.labelGeneratorsBox}
      >
        <div className="flex justify-center h-100 ">
          {/* Tab for Tags */}
          <button
            className={`rounded-l-xl w-1/4 bg-blue-500 text-white p-2 ${
              activeTab === "Tags" ? "bg-blue-700" : ""
            }`}
            onClick={() => setActiveTab("Tags")}
          >
            Tags
          </button>
          {/* Tab for Plaques */}
          <button
            className={`rounded-r-xl w-1/4 bg-blue-500 text-white p-2 ${
              activeTab === "Plaques" ? "bg-blue-700" : ""
            }`}
            onClick={() => setActiveTab("Plaques")}
          >
            Plaques
          </button>
        </div>
        <div className="">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Labels;
