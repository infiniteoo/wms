import { useState, useEffect } from "react";
import moment from "moment";
import { supabase } from "@/supabase";

import "react-datetime/css/react-datetime.css";
import "./OrderModal.css";

const OrderModal = ({ closeModal, onSave, selectedRows, operators }) => {
  const [orderLines, setOrderLines] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");

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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (date) => {
    console.log("date: ", date);
    console.log("formatted time: ", moment(date).format("HH:mm A"));
    return moment(date).format("HH:mm A");
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
  }, [selectedRows]);

  useEffect(() => {}, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.order_lines = orderLines;
    onSave(formData);
    closeModal();
  };

  if (formData.date instanceof Date) {
    formattedAppointmentDate = formData.date.toISOString().split("T")[0];
  }

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
            <img
              src={formData.image}
              alt="item image"
              className="rounded-lg "
            />
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
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
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
              formData.assignedTo
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
          </div>

          <input type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
