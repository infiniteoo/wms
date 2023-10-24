import React, { useState, useEffect } from "react";
import "./OrderModal.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

import { AiOutlinePlusCircle } from "@react-icons/all-files/ai/AiOutlinePlusCircle";

const OrderModal = ({ isOpen, closeModal, onSave, selectedRows }) => {
  const [orderLineTags, setOrderLineTags] = useState([]);
  const [orderLines, setOrderLines] = useState([]);
  const [newOrderLine, setNewOrderLine] = useState({
    item_number: "",
    lot_number: "",
    cases: "",
    description: "",
    manufacturing_date: "",
    expiration_date: "",
  });

  const handleOrderLineChange = (e) => {
    const { name, value } = e.target;
    setNewOrderLine({ ...newOrderLine, [name]: value });
    console.log("new order line: ", newOrderLine);
  };
  const formatTime = (date) => {
    console.log("date: ", date);
    
    console.log("formatted time: ", moment(date).format("HH:mm A"));
    // Use the format you want, for example, "HH:mm"
    return moment(date).format("HH:mm A");
  };
  const formatDate = (date) => {
    console.log("date: ", date);
    
    console.log("formatted time: ", moment(date).format("YYYY-MM-DD"));
    // Use the format you want, for example, "HH:mm"
    return moment(date).format("YYYY-MM-DD");
  };

  const addOrderLine = () => {
    if (newOrderLine.item_number) {
      setOrderLines([...orderLines, newOrderLine]);
      setOrderLineTags([...orderLineTags, newOrderLine.item_number]);
      setNewOrderLine({
        item_number: "",
        lot_number: "",
        cases: "",
        description: "",
        manufacturing_date: "",
        expiration_date: "",
      });
      console.log("order lines: ", orderLines);
    }
  };

  const removeOrderLine = (index) => {
    const updatedOrderLines = [...orderLines];
    updatedOrderLines.splice(index, 1);
    setOrderLines(updatedOrderLines);

    const updatedOrderLineTags = [...orderLineTags];
    updatedOrderLineTags.splice(index, 1);
    setOrderLineTags(updatedOrderLineTags);
  };

  const initialFormData = {
    po_number: "",
    order_lines: "",
    carrier: "",
    trailer_number: "",
    appointment_date: "",
    appointment_time: "",
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
        appointment_date,
        status,
        appointment_time,
        completed,
      });
    } else {
      // No row selected, reset the form data
      setFormData(initialFormData);
    }
  }, [selectedRows]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name: ", name);
    console.log("value: ", value);

    setFormData({ ...formData, [name]: value });
    console.log("form data: ", formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.order_lines = orderLines;
    onSave(formData);
    closeModal();
  };

  let formattedAppointmentDate = formatDate(formData.appointment_date); // Default value if formData.appointment_date is not a Date object

  if (formData.appointment_date instanceof Date) {
    formattedAppointmentDate = formData.appointment_date
      .toISOString()
      .split("T")[0];
  }
  console.log('apt time: ', formData.appointment_time)
  let formattedAppointmentTime = formatTime(formData.appointment_time);
  console.log("formatted appointment time: ", formattedAppointmentTime);

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
              value={formattedAppointmentDate}
              onChange={handleChange}
              required
            />

            <label htmlFor="appointment_time">Appointment Time:</label>
            <Datetime
              id="appointment_time"
              name="appointment_time"
              value={formattedAppointmentTime}
              dateFormat={false}
              onChange={(date) =>
                setFormData({ ...formData, appointment_time: date })
              }
              inputProps={{
                placeholder: "HH:MM A",
              }}
              required
              timeFormat="HH:mm A"
            />
          </div>
          <div className="">
            {orderLineTags.map((tag) => {
              return (
                <span className="bg-gray-300 rounded-full px-2 py-1 mx-1 text-xs">
                  {tag}
                  <div className="inline-block ml-1">
                    <span
                      className="text-red-500 cursor-pointer"
                      onClick={() =>
                        removeOrderLine(orderLineTags.indexOf(tag))
                      }
                    >
                      x
                    </span>
                  </div>
                </span>
              );
            })}
          </div>
          <div className="column" style={{ width: "100%" }}>
            <div className="flex flex-row justify-between items-center">
              <div className="text-xl">
                <AiOutlinePlusCircle onClick={addOrderLine} />
              </div>
              <div>
                <label htmlFor="item_number" className="font-bold">
                  Add Order Line
                </label>
              </div>
            </div>
            <div className="flex flex-row">
              <input
                type="text"
                id="item_number"
                name="item_number"
                value={newOrderLine.item_number}
                onChange={handleOrderLineChange}
                placeholder="Item Number"
              />
              <input
                type="text"
                id="lot_number"
                name="lot_number"
                value={newOrderLine.lot_number}
                onChange={handleOrderLineChange}
                placeholder="lot number"
                className="mx-1"
              />
              <input
                type="text"
                id="cases"
                name="cases"
                value={newOrderLine.cases}
                onChange={handleOrderLineChange}
                placeholder="cases"
              />
            </div>
            <div className="flex flex-row">
              <input
                type="text"
                id="description"
                name="description"
                value={newOrderLine.description}
                onChange={handleOrderLineChange}
                placeholder="description"
              />
              <input
                type="date"
                id="manufacturing_date"
                name="manufacturing_date"
                value={newOrderLine.manufacturing_date}
                onChange={handleOrderLineChange}
                placeholder="manufacturing_date"
              />
              <input
                type="date"
                id="expiration_date"
                name="expiration_date"
                value={newOrderLine.expiration_date}
                onChange={handleOrderLineChange}
                placeholder="expiration_date"
              />
            </div>
          </div>

          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
