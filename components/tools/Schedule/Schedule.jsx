import React from "react";
import CustomTimeline from "./CustomTimeline";
import Toolbar from "./Toolbar";

const Schedule = () => {
  return (
    <div className="flex flex-col">
      <Toolbar />
      <CustomTimeline />
    </div>
  );
};

export default Schedule;
