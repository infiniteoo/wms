import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../supabase";
import ReceivingToolbar from "./ReceivingToolbar";
import OrderModal from "./OrderModal";
import { useUser } from "@clerk/clerk-react";
import DeleteConfirmationModal from "./ConfirmationModal";
import { InternetModule } from "@faker-js/faker";

const Orders = () => {
  const [inventory, setInventory] = useState([]);
  const [actionModifier, setActionModifier] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modifier, setModifier] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [operators, setOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [dockDoors, setDockDoors] = useState([]); // State for dock door options
  const [selectedDockDoor, setSelectedDockDoor] = useState(""); // State for the selected dock door

  const cancelDelete = () => {
    // Cancel the delete operation and close the modal
    setActionModifier("");
    setShowDeleteModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // You can customize the format
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(); // You can customize the format
  };

  const generateRandomPoNumber = () => {
    // Generate a random UUID
    const uuid = uuidv4();

    // Extract the first 10 characters from the UUID and remove hyphens
    const poNumber = uuid.substr(0, 10).replace(/-/g, "");

    return poNumber;
  };

  const calculateTotalCases = (orderLines) => {
    return orderLines.reduce((totalCases, orderLine) => {
      return totalCases + Number(orderLine.cases);
    }, 0);
  };

  const handleStatusChange = async (rowId, newStatus) => {
    try {
      let completed;
      // if newStatus === Completed then set completed to true
      newStatus === "Completed" ? (completed = true) : (completed = false);

      // display popup modal to confirm coompletion
      if (newStatus === "Completed") {
        const confirm = window.confirm(
          "Are you sure you want to mark this order as completed?"
        );
        if (!confirm) {
          return;
        }
      }

      const { data, error } = await supabase
        .from("incoming_orders")
        .update({ status: newStatus, completed: completed })
        .eq("id", rowId)
        .select();
      if (error) {
        console.error(error);
      } else {
        // Update the local state to reflect the new status
        setInventory((inventory) =>
          inventory.map((item) => {
            if (item.id === rowId) {
              return { ...item, status: newStatus };
            } else {
              return item;
            }
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOperatorChange = async (rowId, newOperator) => {
    try {
      setSelectedOperator(newOperator);
      // Update the unloaded_by field of the order in the database
      const { data, error } = await supabase
        .from("incoming_orders")
        .update({ unloaded_by: newOperator })
        .eq("id", rowId)
        .select();

      if (error) {
        console.error(error);
      } else {
        setSelectedOperator("");
        // Update the local state to reflect the new operator
        setInventory((inventory) =>
          inventory.map((item) => {
            if (item.id === rowId) {
              return { ...item, unloaded_by: newOperator };
            } else {
              return item;
            }
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoorChange = async (rowId, newDoor) => {
    try {
      const { data, error } = await supabase
        .from("incoming_orders")
        .update({ assigned_dock_door: newDoor })
        .eq("id", rowId)
        .select();
      if (error) {
        console.error(error);
      } else {
        // Update the local state to reflect the new status
        setInventory((inventory) =>
          inventory.map((item) => {
            if (item.id === rowId) {
              return { ...item, assigned_dock_door: newDoor };
            } else {
              return item;
            }
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = async () => {
    if (selectedRows.length > 0) {
      // Create an array to store promises for each delete operation
      const deletePromises = selectedRows.map(async (row) => {
        try {
          // Delete the item
          const { data, error } = await supabase
            .from("incoming_orders")
            .update({ archived: true })
            .eq("id", row.id)
            .select();
          if (error) {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
        }
      });

      // Wait for all delete operations to complete
      await Promise.all(deletePromises);

      // Update the local state to remove the deleted items
      const updatedInventory = inventory.filter(
        (item) =>
          !selectedRows.some((selectedItem) => selectedItem.id === item.id)
      );
      setInventory(updatedInventory);

      // Clear the selected rows and close the modal
      setSelectedRows([]);
      setActionModifier("");
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    // Step 2: Fetch employee names from Supabase when the component loads
    fetchDockDoors();
    fetchOperators();
    fetchInventory();
  }, [currentPage, searchTerm]);

  const fetchDockDoors = async () => {
    try {
      // Step 2: Fetch dock door options from the Supabase config table
      const { data, error } = await supabase
        .from("config")
        .select("config")
        .eq("id", 1);

      if (error) {
        console.error(error);
      } else {
        // Extract the dock door options from the data and set the state
        if (data.length === 1) {
          console.log("data", data);
          const dockDoorOptions = data[0].config.dockDoors.map(
            (dockDoor) => dockDoor.name
          );

          setDockDoors(dockDoorOptions);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOperators = async () => {
    try {
      const { data, error } = await supabase.from("employees").select("name");
      if (error) {
        console.error(error);
      } else {
        // Extract the employee names from the data and set the state
        const employeeNames = data.map((employee) => employee.name);
        setOperators(employeeNames);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInventory = async () => {
    try {
      const { data, error } = await supabase
        .from("incoming_orders")
        .select("*")
        .ilike(modifier, `%${searchTerm}%`)
        .range(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage - 1
        );

      if (error) {
        console.error(error);
      } else {
        setInventory(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSave = async (formData) => {
    console.log("form data on save: ", formData);
    let po_number;
    if (formData.po_number === "") {
      po_number = generateRandomPoNumber();
    } else {
      po_number = formData.po_number;
    }

    const {
      order_lines,
      carrier,
      trailer_number,
      appointment_date,
      appointment_time,
    } = formData;

    const item = {
      po_number,
      order_lines,
      carrier,
      trailer_number,
      appointment_date,
      appointment_time,
      created_by: user.user.fullName,
      completed: false,
      unloaded_by: null,
      currently_unloading: false,
      assigned_dock_door: null,
      last_updated: new Date(),
      updated_by: user.user.fullName,
      status: "Pending",
    };
    // if selectedRows is empty, add item to database
    if (selectedRows.length === 0) {
      // Add logic to save item to database
      const { data, error } = await supabase
        .from("incoming_orders")
        .insert([item])
        .select();
      if (error) {
        console.error(error);
      } else {
        console.log("data", data);
        setInventory([...inventory, data[0]]);
        setSelectedRows([]);
        setActionModifier("");
        console.log("action modified: ", actionModifier);
      }
    } else {
      // update item in database with selectedRows[0].id
      console.log("selectedRow[0].id", selectedRows[0].id);
      console.log("item", item);
      const { data, error } = await supabase
        .from("incoming_orders")
        .update(item)
        .eq("id", selectedRows[0].id)

        .select();

      if (error) {
        console.error(error);
      } else {
        console.log("data", data);
        setInventory(
          inventory.map((item) => {
            if (item.id === data[0].id) {
              return data[0];
            } else {
              return item;
            }
          })
        );
        setSelectedRows([]);
        setActionModifier("");
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (event, rowItem) => {
    event.stopPropagation(); // Prevent the click event from propagating to the row
    handleRowClick(rowItem);
  };

  const handleRowClick = (rowItem) => {
    setSelectedRows((prevSelectedRows) => {
      // Check if the clicked row is already selected
      const isRowSelected = prevSelectedRows.some(
        (item) => item.id === rowItem.id
      );

      if (isRowSelected) {
        // If the row is already selected, remove it from the selected rows
        return prevSelectedRows.filter((item) => item.id !== rowItem.id);
      } else {
        // If the row is not selected, add it to the selected rows
        return [...prevSelectedRows, rowItem];
      }
    });
  };

  return (
    <div className="mt-8 border-orange-500 ml-2" style={{ width: "99%" }}>
      <ReceivingToolbar
        inventory={inventory}
        setInventory={setInventory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        modifier={modifier}
        setModifier={setModifier}
        actionModifier={actionModifier}
        setActionModifier={setActionModifier}
        selectedRows={selectedRows}
        setIsOpen={setIsOpen}
        setSelectedRows={setSelectedRows}
        setItemToDelete={setItemToDelete}
        setShowDeleteModal={setShowDeleteModal}
        fetchInventory={fetchInventory}
      />
      {inventory && (
        <div className="table-container h-80 overflow-y-auto mt-1">
          <table className="rounded-lg overflow-hidden text-sm w-full">
            <colgroup>
              <col style={{ width: "60px" }} />{" "}
              {/* Adjust the width as needed */}
              <col style={{ width: "120spx" }} />{" "}
              {/* Adjust the width as needed */}
              <col style={{ width: "100px" }} />{" "}
              {/* Adjust the width as needed */}
              <col style={{ width: "100px" }} />{" "}
              {/* Adjust the width as needed */}
              <col style={{ width: "100px" }} />{" "}
              {/* Adjust the width as needed */}
              <col style={{ width: "100px" }} />{" "}
              {/* Adjust the width as needed */}
              <col style={{ width: "100px" }} />{" "}
              {/* Adjust the width as needed */}
              <col style={{ width: "120px" }} />{" "}
              {/* Adjust the width as needed */}
              <col style={{ width: "160px" }} />{" "}
              {/* Adjust the width as needed */}
              <col style={{ width: "160px" }} />{" "}
              {/* Adjust the width as needed */}
              <col style={{ width: "160px" }} />{" "}
              {/* Adjust the width as needed */}
            </colgroup>
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2"></th>
                <th className="py-2">PO Number</th>
                <th className="py-2">Order Lines</th>
                <th className="py-2">Carrier</th>
                <th className="py-2">Trailer Number</th>
                <th className="py-2">Total Cases</th>
                <th className="py-2">Appt. Date</th>
                <th className="py-2">Appt. Time</th>
                <th className="py-2">Status</th>
                <th className="py-2">Dock Door</th>
                <th className="py-2">Operator</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    selectedRows.some(
                      (selectedItem) => selectedItem.id === item.id
                    )
                      ? "font-bold bg-yellow-200"
                      : index % 2 === 0
                      ? "bg-gray-100"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <td className="py-2">
                    <input
                      type="checkbox"
                      onChange={(event) => handleCheckboxChange(event, item)}
                      checked={selectedRows.some(
                        (selectedItem) => selectedItem.id === item.id
                      )}
                      style={{ marginRight: "6px" }}
                    />
                    {selectedRows.includes(item.id) ? "✓" : null}
                  </td>
                  <td className="py-2 text-center">{item.po_number}</td>
                  <td className="py-2 text-center">
                    {item.order_lines.length}
                  </td>
                  <td className="py-2 text-center">{item.carrier}</td>
                  <td className="py-2 text-center">{item.trailer_number}</td>
                  <td className="py-2 text-center">
                    {calculateTotalCases(item.order_lines)}
                  </td>
                  <td className="py-2 text-center">
                    {formatDate(item.appointment_date)}
                  </td>
                  <td className="py-2 text-center">
                    {formatTime(item.appointment_time)}
                  </td>
                  <td className="py-2 text-center">
                    {item.completed ? (
                      item.status // Display the text value when the order is completed
                    ) : (
                      <select
                        value={item.status || ""}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value)
                        }
                      >
                        <option value="Unloading">Unloading</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Pending">Pending</option>
                      </select>
                    )}
                  </td>

                  <td className="py-2 text-center">
                    {item.completed ? (
                      item.assigned_dock_door // Display the text value when the order is completed
                    ) : (
                      <select
                        value={item.assigned_dock_door || ""}
                        onChange={(e) =>
                          handleDoorChange(item.id, e.target.value)
                        }
                      >
                        <option value="">Select Dock Door</option>
                        {/* Step 3: Populate the dock door select dropdown with options */}
                        {dockDoors.map((dockDoor, index) => (
                          <option key={index} value={dockDoor}>
                            {dockDoor}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>

                  <td className="py-2 text-center">
                    {item.completed ? (
                      item.unloaded_by // Display the text value when the order is completed
                    ) : (
                      <select
                        value={item.unloaded_by || ""}
                        onChange={(e) =>
                          handleOperatorChange(item.id, e.target.value)
                        }
                      >
                        <option value="">Select Operator</option>
                        {/* Step 3: Populate the operator select dropdown with employee names */}
                        {operators.map((operator, index) => (
                          <option key={index} value={operator}>
                            {operator}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pagination text-center mt-10">
        {inventory && inventory.length > itemsPerPage && (
          <>
            {" "}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-blue-500 text-white text-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              &laquo; Previous Page
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={inventory && inventory.length < itemsPerPage}
              className="px-4 py-2 rounded-md bg-blue-500 text-white text-lg hover:bg-blue-600 ml-4 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Next Page &raquo;
            </button>
          </>
        )}
        {isOpen && (
          <OrderModal
            setIsOpen={setIsOpen}
            closeModal={closeModal}
            onSave={onSave}
            selectedRows={selectedRows}
          />
        )}
        {showDeleteModal && (
          <DeleteConfirmationModal
            showDeleteModal={showDeleteModal}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
            selectedRows={selectedRows}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
