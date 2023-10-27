import React from "react";

import "./AddAppointmentModal.css";

const SettingsModal = ({ setOpenSettings }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {" "}
        <span className="close" onClick={() => setOpenSettings(false)}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default SettingsModal;
