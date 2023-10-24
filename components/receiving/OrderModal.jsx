import React, { useState, useEffect } from "react";
import "./OrderModal.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const OrderModal = ({ isOpen, closeModal, onSave, selectedRows }) => {
  const initialFormData = {
    po_number: "",
    order_lines: "",
    carrier: "",
    trailer_number: "",
    appointment_date: "",
    staus: "Pending",
    created_by: "",
    completed: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (selectedRows.length === 1) {
      const {
        po_number,
        order_lines,
        carrier,
        trailer_number,
        appointment_date,
        status,
        created_by,
        completed,
        appointment_time,
      } = selectedRows[0];

      setFormData({
        po_number,
        order_lines,
        carrier,

        trailer_number,
        appointment_date: new Date(),
        status,
        appointment_time: new Date("12:00:00"),

        completed,
      });
    } else {
      // No row selected, reset the form data
      setFormData(initialFormData);
    }
  }, [selectedRows]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    closeModal();
  };

  return (
    <div className="modal" id="item-modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>

        <form onSubmit={handleSubmit} id="item-form">
          <div className="column">
            <label htmlFor="carrier">Carrier:</label>
            <input
              type="text"
              id="carrier"
              name="carrier"
              value={formData.carrier}
              onChange={handleChange}
              required
            />
            <label htmlFor="trailer_number">Trailer Number:</label>
            <input
              type="text"
              id="d"
              name="trailer_number"
              value={formData.trailer_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="column">
            <label htmlFor="appointment_date">Appointment Date:</label>
            <input
              type="date"
              id="appointment_date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              required
            />

            <label htmlFor="appointment_time">Appointment Time:</label>
            <Datetime
              id="appointment_time"
              name="appointment_time"
              value={formData.appointment_time}
              onChange={(date) => setFormData({ appointment_time: date })}
              required
              dateFormat={false}
            />
          </div>

          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
