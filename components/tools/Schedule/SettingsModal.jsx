import React, { useState, useEffect } from "react";
import { fakeEmployeeList } from "./fakeEmployeeList";
import { supabase } from "../../../supabase";

const SettingsModal = ({ setOpenSettings, onClose }) => {
  const [activeSection, setActiveSection] = useState("addEmployee");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedShift, setSelectedShift] = useState("morning");
  const [selectedEndOfWeek, setSelectedEndOfWeek] = useState("Friday");
  const [selectedDays, setSelectedDays] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const getEmployees = async () => {
    const { data, error } = await supabase.from("employees").select("*");

    if (error) {
      console.log(error);
    }

    if (data) {
      setEmployeeList(data);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []); // This useEffect will run once when the component is mounted.

  const switchSection = (section) => {
    setActiveSection(section);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setFirstName(employee.name);
    setPhoneNumber(employee.phone_number);
    setSelectedDays(employee.scheduled_days);
    setSelectedShift(employee.shift);
  };

  const handleDaysClick = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    if (selectedEmployee) {
      // Update the existing employee's details
      const { data, error } = await supabase
        .from("employees")
        .update([
          {
            name: firstName,
            phone_number: phoneNumber,
            scheduled_days: selectedDays,
            shift: selectedShift,
          },
        ])
        .eq("id", selectedEmployee.id);

      if (error) {
        console.log(error);
      }
    } else {
      // Add a new employee
      const { data, error } = await supabase.from("employees").insert([
        {
          name: firstName,
          phone_number: phoneNumber,
          scheduled_days: selectedDays,
          shift: selectedShift,
        },
      ]);

      if (error) {
        console.log(error);
      }

      if (data) {
        setEmployeeList([...employeeList, data[0]]);
      }
    }

    // Reset the form fields
    setFirstName("");
    setPhoneNumber("");
    setSelectedShift("");
    setSelectedEndOfWeek("");
    setSelectedDays([]);
    setSelectedEmployee(null);

    // After adding or updating an employee, re-fetch the employee list
    getEmployees();
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
              <div className="text-sm text-center">Employees</div>
              <div className="overflow-y-scroll flex flex-col my-2 ml-2">
                {employeeList.map((employee) => {
                  return (
                    <div
                      className={`flex flex-row justify-left cursor-pointer hover:bg-gray-300 ${
                        selectedEmployee === employee ? "selected" : ""
                      }`}
                      key={employee.id}
                      onClick={() => handleEmployeeClick(employee)}
                    >
                      <div className="flex flex-col">
                        <div className="text-black font-bold">
                          {employee.name}
                        </div>
                        <div className="text-black text-sm mb-3">
                          Employee ID: {employee.id}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className={`text-sm text-center cursor-pointer ${
                  !selectedEmployee ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedEmployee(null);
                  setFirstName("");
                  setPhoneNumber("");
                  setSelectedShift("");
                  setSelectedDays([]);
                }}
              >
                + New Employee
              </div>
            </div>
            <div
              id="bottom_left"
              className="border-2 border-black h-fit-content w-1/2 mr-2"
              style={{ fontSize: "12px", padding: "0" }}
            >
              <div className="text-center">
                <form
                  onSubmit={handleAddEmployee}
                  className=" justify-center relative"
                >
                  <div className="mb-1">
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
                  <div className="mb-1">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="px-2 py-1 w-40 text-md"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="selectedDays">Select Days</label>
                    <div className="flex flex-row justify-around text-lg">
                      {["Su", "M", "T", "W", "Th", "F", "S"].map((day) => (
                        <div
                          key={day}
                          className={`${
                            selectedDays.includes(day) ? "selected-day" : ""
                          } cursor-pointer`}
                          onClick={() => handleDaysClick(day)}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="selectedShift">Select Shift</label>
                    <select
                      id="selectedShift"
                      name="selectedShift"
                      value={selectedShift}
                      onChange={(e) => setSelectedShift(e.target.value)}
                      className="px-2 py-1 w-40 text-md w-fit-content"
                    >
                      <option value="Mornings (6a-4:30p)">
                        Mornings (6a-4:30p)
                      </option>
                      <option value="Swing (9a-7:30p)">Swing (9a-7:30p)</option>
                      <option value="Nights (5p-3:30a)">
                        Nights (5p-3:30a)
                      </option>
                      <option value="Nights (8p-6:30a)">
                        Nights (8p-6:30a)
                      </option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-300 rounded p-2 px-4 text-md mb-2 text-white font-bold"
                  >
                    Save
                  </button>
                </form>
              </div>
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
