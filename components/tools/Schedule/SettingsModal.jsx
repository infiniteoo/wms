import React, { useState } from "react";
import { fakeEmployeeList } from "./fakeEmployeeList";

const SettingsModal = ({ setOpenSettings, onClose }) => {
  const [activeSection, setActiveSection] = useState("addEmployee");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedShift, setSelectedShift] = useState("morning");
  const [selectedEndOfWeek, setSelectedEndOfWeek] = useState("Friday");
  const [selectedDays, setSelectedDays] = useState("Monday");

  const switchSection = (section) => {
    setActiveSection(section);
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();

    setFirstName("");
    setLastName("");
    setSelectedShift("");
    setSelectedEndOfWeek("");
  };

  return (
    <div className="modal" style={{ zIndex: "5000" }}>
      <div className="modal-content h-full w-full">
        <span className="close ml-4" onClick={() => setOpenSettings(false)}>
          &times;
        </span>
        <div className="flex" id="main_view">
          <div className="flex flex-row w-full" id="left_side">
            <div
              id="top_left"
              className="border-2 border-black h-100 w-1/2 justify-around flex flex-col"
            >
              <h2 className="text-4xl text-center border-black rounded border-2 mx-5 p-1 ">
                Settings
              </h2>
              <div className="mb-2 flex flex-col hover:bg-violet-100 mx-6">
                <button
                  className={`section-button ${
                    activeSection === "addEmployee" ? "active" : ""
                  }`}
                  onClick={() => switchSection("addEmployee")}
                >
                  Add Employee
                </button>
              </div>
              <div className="mb-2 text-center  rounded  mx-6 hover:bg-violet-100">
                <button
                  className={`section-button ${
                    activeSection === "employeeList" ? "active" : ""
                  }`}
                  onClick={() => switchSection("employeeList")}
                >
                  Employee List
                </button>
              </div>
              <div className="mb-2 text-center rounded mx-6 hover:bg-violet-100"></div>
            </div>
            <div
              id="bottom_left"
              className="border-2 border-black h-fit-content w-1/2 mr-2"
              style={{ fontSize: "12px", padding: "0" }}
            >
              {activeSection === "addEmployee" && (
                <div className="text-center">
                  <form
                    onSubmit={handleAddEmployee}
                    className=" justify-center relative"
                  >
                    <div className="mb-4">
                      <label htmlFor="firstName">Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First & Last Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="px-2 py-1 w-40 text-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="selectedDays">Select Days</label>
                      <select
                        id="selectedDays"
                        name="selectedDays"
                        value={selectedDays}
                        onChange={(e) => setSelectedDays(e.target.value)}
                        className="px-2 py-1 w-40 text-md"
                      >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-300 rounded p-2 text-md mb-2 text-white"
                    >
                      Add Employee
                    </button>
                  </form>
                </div>
              )}
              {activeSection === "employeeList" && (
                <div className="text-center h-full">
                  <div className="text-white">{fakeEmployeeList()}</div>
                </div>
              )}
              {activeSection === "employeeInfo" && (
                <div className="text-center h-100">
                  <div className="text-center h-full">
                    <div className="text-white">{fakeEmployeeList()}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col" id="right_side">
            {/* Content for the right side */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
