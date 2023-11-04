import React, { useState, useEffect } from "react";
import "./OrderModal.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/supabase";

import { AiOutlinePlusCircle } from "@react-icons/all-files/ai/AiOutlinePlusCircle";

const OrderModal = ({
  isOpen,
  closeModal,
  onSave,
  selectedRows,
  operators,
}) => {
  const [orderLines, setOrderLines] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [newOrderLine, setNewOrderLine] = useState({
    id: "",
    barcodeData: "",
    description: "",
    image: "",
    date: "",
    location: "",
    submittedBy: "",
    resolved: "",
    assignedTo: "",
    archived: "",
  });

  const handleOrderLineChange = (e) => {
    const { name, value } = e.target;
    setNewOrderLine({ ...newOrderLine, [name]: value });
    console.log("new order line: ", newOrderLine);
  };

  const handleOperatorChange = async (rowId, newOperator) => {
    try {
      setSelectedOperator(newOperator);
      const { data, error } = await supabase
        .from("incidents")
        .update({ assignedTo: newOperator })
        .eq("id", rowId)
        .select();
      if (error) {
        console.error(error);
      } else {
        formData.assignedTo = newOperator;
        setSelectedOperator("");
        // Update the local state to reflect the new status
      }
    } catch (error) {
      console.error(error);
    }
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
  const generateRandomPoNumber = () => {
    // Generate a random UUID
    const uuid = uuidv4();

    // Extract the first 10 characters from the UUID and remove hyphens
    const poNumber = uuid.substr(0, 10).replace(/-/g, "");

    return poNumber;
  };

  const initialFormData = {
    id: "",
    barcodeData: "",
    description: "",
    image: "",
    date: "",
    location: "",
    submittedBy: "",
    resolved: "",
    assignedTo: "",
    archived: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (selectedRows.length === 1) {
      const {
        id,
        barcodeData,
        description,
        image,
        date,
        location,
        submittedBy,
        resolved,
        assignedTo,
        archived,
      } = selectedRows[0];

      setFormData({
        id,
        barcodeData,
        description,
        image,
        date,
        location,
        submittedBy,
        resolved,
        assignedTo,
        archived,
      });
    } else {
      // No row selected, reset the form data
      setFormData(initialFormData);
    }
    console.log("formdata in selectedrow useeeffects: ", formData);
  }, [selectedRows]);

  useEffect(() => {}, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name: ", name);
    console.log("value: ", value);

    setFormData({ ...formData, [name]: value });
    console.log("form data: ", formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("order lines in handlesubmit: ", orderLines);
    console.log("form data in handlesubmit before mutation: ", formData);
    formData.order_lines = orderLines;
    console.log("form data inhandlesubmit: ", formData);
    onSave(formData);
    closeModal();
  };

  let formattedAppointmentDate = formatDate(formData.date);

  if (formData.date instanceof Date) {
    formattedAppointmentDate = formData.date.toISOString().split("T")[0];
  }
  console.log("apt time: ", formData.time);
  let formattedAppointmentTime = formatTime(formData.time);
  console.log("formatted appointment time: ", formattedAppointmentTime);

  return (
    <div className="modal" id="item-modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>

        <form onSubmit={handleSubmit} id="item-form">
          <div className="column">
            <img src={formData.image}></img>
          </div>

          <div className="column">
            <label htmlFor="barcodeData">LPN Number:</label>
            <input
              type="text"
              id="barcodeData"
              name="barcodeData"
              value={formData.barcodeData}
              onChange={handleChange}
              readOnly
            />
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <label htmlFor="date">Date Submitted:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formattedAppointmentDate}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="w-100 text-left">
            {" "}
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="column">
            <label htmlFor="resolved">Resolved:</label>
            <select
              id="resolved"
              name="resolved"
              value={formData.resolved}
              onChange={handleChange}
              required
            >
              <option value="Y">Y</option>
              <option value="N">N</option>
            </select>
          </div>

          <div className="column">
            {formData.resolved === "Y" ? (
              formData.assignedTo // Display the text value when the order is completed
            ) : (
              <>
                {" "}
                <label htmlFor="assignedTo">Assigned To:</label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) =>
                    handleOperatorChange(formData.id, e.target.value)
                  }
                >
                  <option value="">Select Operator</option>
                  {operators.map((operator, index) => (
                    <option key={index} value={operator}>
                      {operator}
                    </option>
                  ))}
                </select>
              </>
            )}
            <label htmlFor="submittedBy">Submitted By:</label>
            <input
              type="text"
              id="submittedBy"
              name="submittedBy"
              value={formData.submittedBy}
              onChange={handleChange}
              required
            />
          </div>

          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
