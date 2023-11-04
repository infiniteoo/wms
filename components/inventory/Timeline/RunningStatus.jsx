import React from "react";
import "./RunningStatus.css"; // You can create a CSS file for styling

function RunningStatus({ status }) {
  if (status.includes("RUNNING")) {
    return <div className="running-box">{status}</div>;
  } else {
    return <div className="stopped-box">{status}</div>;
  }
}

export default RunningStatus;
