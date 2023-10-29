import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabase";

const Modal = ({ appointment, closeModal, setEvents }) => {
  const [formData, setFormData] = useState({
    id: appointment.id,
    start: appointment.start,
    end: appointment.end,
    title: appointment.title || "",
    created_at: appointment.created_at,
    created_by: appointment.created_by,
    updated_at: appointment.updated_at,
    updated_by: appointment.updated_by,
    order_number: appointment.order_number || "",
    carrier: appointment.carrier || "",
    trailer_number: appointment.trailer_number || "",
    booker_name: appointment.booker_name || "",
    booker_email: appointment.booker_email || "",
    booker_phone: appointment.booker_phone,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted with data: ", formData);
    // You can handle saving the updated data to your backend here.
    const { data, error } = await supabase
      .from("appointments")
      .update({
        start: formData.start,
        end: formData.end,
        title: formData.title,
        created_at: formData.created_at,
        created_by: formData.created_by,
        updated_at: formData.updated_at,
        updated_by: formData.updated_by,
        order_number: formData.order_number,
        carrier: formData.carrier,
        trailer_number: formData.trailer_number,
        booker_name: formData.booker_name,
        booker_email: formData.booker_email,
        booker_phone: formData.booker_phone,
      })
      .eq("id", formData.id)
      .select("*");
    if (error) {
      console.log("error", error);
    }
    if (data) {
      const updatedEventData = data[0];
      console.log("Event:", updatedEventData);
      data[0].start = new Date(data[0].start) || new Date();
      data[0].end = new Date(data[0].end) || new Date();

      // Find and update the existing event in myEvents state
      setEvents((prev) =>
        prev.map((event) =>
          event.id === updatedEventData.id ? updatedEventData : event
        )
      );
    }
    closeModal();
  };

  const handleDelete = async () => {
    console.log("delete button clicked");
    // You can handle deleting the data from your backend here.
    const { data, error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", formData.id)
      .select("*");

    if (error) {
      console.log("error", error);
    }
    if (data) {
      console.log("data", data);

      const deletedEventId = formData.id;

      // Filter out the deleted appointment from the events
      setEvents((prev) => prev.filter((event) => event.id !== deletedEventId));
    }
    closeModal();
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      start: formatDatetimeForInput(appointment.start),
      end: formatDatetimeForInput(appointment.end),
    }));
  }, [appointment]);

  const formatDatetimeForInput = (datetime) => {
    if (!datetime) {
      return "";
    }
    const isoString = datetime.toISOString();
    return isoString.slice(0, 16); // Format: "yyyy-MM-ddThh:mm"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="modal" id="item-modal" style={{ zIndex: "6000" }}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>

        <form onSubmit={handleSubmit} id="item-form">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <label>Order Number:</label>
          <input
            type="text"
            name="order_number"
            value={formData.order_number}
            onChange={handleInputChange}
          />
          <div className="column">
            <label>Start:</label>
            <input
              type="datetime-local"
              name="start"
              value={formData.start}
              onChange={handleInputChange}
            />
            <label>Carrier:</label>
            <input
              type="text"
              name="carrier"
              value={formData.carrier}
              onChange={handleInputChange}
            />
            <label>Booker:</label>
            <input
              type="text"
              name="booker_name"
              value={formData.booker_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="column"></div>

          <div className="column">
            <label>End:</label>
            <input
              type="datetime-local"
              name="end"
              value={formData.end}
              onChange={handleInputChange}
            />
            <label>Trailer Number:</label>
            <input
              type="text"
              name="trailer_number"
              value={formData.trailer_number}
              onChange={handleInputChange}
            />
            <label>Booker Contact:</label>
            <input
              type="text"
              name="booker_email"
              value={formData.booker_email}
              onChange={handleInputChange}
            />
          </div>

          {/* Add similar input fields for other data fields from the appointment object */}

          <div
            className="flex flex-row justify-center float-left "
            style={{ width: "100%" }}
          >
            <button
              className="bg-blue-500 text-white px-7 rounded-md  "
              value="Save"
              onClick={handleSubmit}
            >
              Save
            </button>

            <div className="">
              <button
                className="bg-red-500 text-white p-4 rounded-md ml-5 "
                value="Delete"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
