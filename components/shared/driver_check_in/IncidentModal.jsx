import { useState, useEffect } from "react";
import { supabase } from "@/supabase";
import "./OrderModal.css";

import "react-datetime/css/react-datetime.css";
import moment from "moment";

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
  const formatDate = (date) => {
    console.log("date: ", date);

    console.log("formatted time: ", moment(date).format("YYYY-MM-DD"));

    return moment(date).format("YYYY-MM-DD");
  };

  const initialFormData = {
    id: "",
    _id: "",
    description: "",
    signInData: {},
    status: "",
    loaderName: "",
    assignedDoor: "",
    weight: "",
    checkOutTime: new Date(),
    checkInTime: new Date(),
    created_at: new Date(),
    checkInNumber: "",
    appointmentTime: new Date(),
    purchaseOrderNumber: "",
    carrier: "",
    destination: "",
    bookerEmailAddress: "",
    bookerPhoneNumber: "",
    bookerName: "",
    trailerNumber: "",
    driverPhoneNumber: "",
    driverName: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (selectedRows.length === 1) {
      const {
        id,
        _id,
        description,
        signInData,
        status,
        loaderName,
        assignedDoor,
        weight,
        checkOutTime,
        checkInTime,
        created_at,
        checkInNumber,
        appointmentTime,
        purchaseOrderNumber,
        carrier,
        destination,
        bookerEmailAddress,
        bookerPhoneNumber,
        bookerName,
        trailerNumber,
        driverPhoneNumber,
        driverName,
      } = selectedRows[0];

      setFormData({
        id,
        _id,
        description,
        signInData,
        status,
        loaderName,
        assignedDoor,
        weight,
        checkOutTime,
        checkInTime,
        created_at,
        checkInNumber,
        appointmentTime,
        purchaseOrderNumber,
        carrier,
        destination,
        bookerEmailAddress,
        bookerPhoneNumber,
        bookerName,
        trailerNumber,
        driverPhoneNumber,
        driverName,
      });
    } else {
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

  let formattedAppointmentDate = formatDate(formData.date);

  if (formData.date instanceof Date) {
    formattedAppointmentDate = formData.date.toISOString().split("T")[0];
  }

  let formattedAppointmentTime = formatTime(formData.time);

  return (
    <div
      className="fixed top-[0%] left-0 w-[100%] h-[100%] bg-gray-900 bg-opacity-75 items-center justify-center flex"
      id="item-modal"
    >
      <div className="bg-white w-[60%] m-0 p-2 rounded-xl relative">
        <span
          className="absolute top-5 right-2 text-4xl cursor-pointer"
          onClick={closeModal}
        >
          &times;
        </span>

        <form onSubmit={handleSubmit} id="item-form">
          <div className="w-[48%] float-left mr-2">
            <label htmlFor="driverName">Driver Name:</label>
            <input
              type="text"
              id="driverName"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              readOnly
            />
            <label htmlFor="carrier">Carrier:</label>
            <input
              type="text"
              id="carrier"
              name="carrier"
              value={formData.carrier}
              onChange={handleChange}
              readOnly
            />
            <label htmlFor="trailerNumber">Trailer Number:</label>
            <input
              type="text"
              id="trailerNumber"
              name="trailerNumber"
              value={formData.trailerNumber}
              onChange={handleChange}
              readOnly
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
