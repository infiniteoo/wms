import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../../supabase";
import ReportToolbar from "./ReportToolbar";
import IncidentModal from "./IncidentModal";
import DeleteConfirmationModal from "./ConfirmationModal";

const ReportTable = () => {
  const [inventory, setInventory] = useState([]);
  const [actionModifier, setActionModifier] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modifier, setModifier] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [operators, setOperators] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [dockDoors, setDockDoors] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");

  const cancelDelete = () => {
    setActionModifier("");
    setShowDeleteModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  const generateRandomPoNumber = () => {
    const uuid = uuidv4();

    // Extract the first 10 characters from the UUID and remove hyphens
    const poNumber = uuid.substr(0, 10).replace(/-/g, "");

    return poNumber;
  };

  const handleStatusChange = async (rowId, newStatus) => {
    try {
      if (newStatus === "Complete") {
        const confirm = window.confirm(
          "Are you sure you want to mark this incident as resolved?"
        );
        if (!confirm) {
          return;
        }
      }

      const { data, error } = await supabase
        .from("driver_check_in")
        .update({ status: newStatus })
        .eq("id", rowId)
        .select();
      if (error) {
        console.error(error);
      } else {
        setInventory((inventory) =>
          inventory.map((item) => {
            if (item.id === rowId) {
              return { ...item, resolved: newStatus };
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
      const { data, error } = await supabase
        .from("driver_check_in")
        .update({ loaderName: newOperator })
        .eq("id", rowId)
        .select();
      if (error) {
        console.error(error);
      } else {
        setSelectedOperator("");

        setInventory((inventory) =>
          inventory.map((item) => {
            if (item.id === rowId) {
              return { ...item, loaderName: newOperator };
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
            .from("driver_check_in")
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

      setSelectedRows([]);
      setActionModifier("");
      setShowDeleteModal(false);
    }
  };
  const fetchDockDoors = async () => {
    try {
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

  useEffect(() => {
    fetchDockDoors();
    fetchOperators();
    fetchInventory();
  }, [currentPage, searchTerm]);

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
        .from("driver_check_in")
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
    if (formData.purchaseOrderNumber === "") {
      po_number = generateRandomPoNumber();
    } else {
      po_number = formData.purchaseOrderNumber;
    }

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
    } = formData;

    const item = {
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
    };

    if (selectedRows.length === 0) {
      const { data, error } = await supabase
        .from("driver_check_in")
        .insert([item])
        .select();
      if (error) {
        console.error(error);
      } else {
        console.log("data", data);
        setInventory([...inventory, data[0]]);
        setSelectedRows([]);
        setActionModifier("");
      }
    } else {
      const { data, error } = await supabase
        .from("driver_check_in")
        .update(item)
        .eq("id", selectedRows[0].id)

        .select();

      if (error) {
        console.error(error);
      } else {
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

  const handleDoorChange = async (rowId, newDoor) => {
    try {
      const { data, error } = await supabase
        .from("driver_check_in")
        .update({ assignedDoor: newDoor })
        .eq("id", rowId)
        .select();
      if (error) {
        console.error(error);
      } else {
        setInventory((inventory) =>
          inventory.map((item) => {
            if (item.id === rowId) {
              return { ...item, assignedDoor: newDoor };
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

  const handleCheckboxChange = (event, rowItem) => {
    event.stopPropagation();
    handleRowClick(rowItem);
  };

  const handleRowClick = (rowItem, index) => {
    setSelectedRowIndex(index);
    setSelectedRows((prevSelectedRows) => {
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
    <div className=" border-orange-500 ml-2" style={{ width: "99%" }}>
      <ReportToolbar
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
              <col style={{ width: "30px" }} />
              {/* Adjust the width as needed */}
              <col style={{ width: "100px" }} />
              {/* Adjust the width as needed */}
              <col style={{ width: "100px" }} />
              {/* Adjust the width as needed */}
              <col style={{ width: "100px" }} />
              {/* Adjust the width as needed */}
              <col style={{ width: "100px" }} />
              {/* Adjust the width as needed */}
              <col style={{ width: "100px" }} />
              {/* Adjust the width as needed */}
              <col style={{ width: "150px" }} />
              <col style={{ width: "170px" }} />
              {/* Adjust the width as needed */}
              <col style={{ width: "100px" }} />
              {/* Adjust the width as needed */}
              <col style={{ width: "100px" }} />
              <col style={{ width: "100px" }} />
              {/* Adjust the width as needed */}
            </colgroup>
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2"></th>
                <th className="py-2">Driver Name</th>
                <th className="py-2">Carrier</th>
                <th className="py-2">Trailer</th>
                <th className="py-2">Driver Phone</th>
                <th className="py-2">Destination</th>
                <th className="py-2">PO Number</th>
                <th className="py-2">Appointment</th>
                <th className="py-2">Status</th>
                <th className="py-2">Operator</th>
                <th className="py-2">Dock Door</th>
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
                  onClick={() => handleRowClick(item, index)} // Handle row click
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

                  <td className="py-2 text-center">{item.driverName}</td>
                  <td className="py-2 text-center">{item.carrier}</td>
                  <td className="py-2 text-center">{item.trailerNumber}</td>
                  <td className="py-2 text-center">{item.driverPhoneNumber}</td>
                  <td className="py-2 text-center">{item.destination}</td>
                  <td className="py-2 text-center">
                    {item.purchaseOrderNumber}
                  </td>
                  <td className="py-2 text-center">
                    {formatDate(item.appointmentTime)},{" "}
                    {formatTime(item.appointmentTime)}
                  </td>

                  <td className="py-2 text-center">
                    {item.status === "Complete" ? (
                      item.status // Display the text value when the order is completed
                    ) : (
                      <select
                        value={item.status || ""}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value)
                        }
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Loading">Loading</option>
                        <option value="Complete">Complete</option>
                      </select>
                    )}
                  </td>

                  <td className="py-2 text-center">
                    {item.status === "Complete" ? (
                      item.loaderName // Display the text value when the order is completed
                    ) : (
                      <select
                        value={item.loaderName || ""}
                        onChange={(e) =>
                          handleOperatorChange(item.id, e.target.value)
                        }
                      >
                        <option value="">Operator</option>
                        {operators.map((operator, index) => (
                          <option key={index} value={operator}>
                            {operator}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="py-2 text-center">
                    {item.status === "Complete" ? (
                      item.assignedDoor // Display the text value when the order is completed
                    ) : (
                      <select
                        value={item.assignedDoor}
                        onChange={(e) =>
                          handleDoorChange(item.id, e.target.value)
                        }
                      >
                        <option value="">Dock Door</option>
                        {dockDoors.map((dockDoor, index) => (
                          <option key={index} value={dockDoor}>
                            {dockDoor}
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
          <IncidentModal
            setIsOpen={setIsOpen}
            closeModal={closeModal}
            onSave={onSave}
            selectedRows={selectedRows}
            operators={operators}
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

export default ReportTable;
