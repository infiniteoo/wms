import React from "react";
import "./AddAppointmentModal.css";

const AddAppointmentModal = ({ setOpenModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {" "}
        <span className="close" onClick={() => setOpenModal(false)}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
