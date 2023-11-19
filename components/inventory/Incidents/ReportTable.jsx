import { useEffect, useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [operators, setOperators] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const cancelDelete = () => {
    // Cancel the delete operation and close the modal
    setActionModifier("");
    setShowDeleteModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const generateRandomPoNumber = () => {
    const uuid = uuidv4();

    // Extract the first 10 characters from the UUID and remove hyphens
    const poNumber = uuid.substr(0, 10).replace(/-/g, "");

    return poNumber;
  };

  const handleStatusChange = async (rowId, newStatus) => {
    try {
      let resolved;
      newStatus === "Y" ? (resolved = "Y") : (resolved = "N");

      // display popup modal to confirm coompletion
      if (newStatus === "Y") {
        const confirm = window.confirm(
          "Are you sure you want to mark this incident as resolved?"
        );
        if (!confirm) {
          return;
        }
      }

      const { data, error } = await supabase
        .from("incidents")
        .update({ resolved: resolved })
        .eq("id", rowId)
        .select();
      if (error) {
        console.error(error);
      } else {
        // Update the local state to reflect the new status
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
        .from("incidents")
        .update({ assignedTo: newOperator })
        .eq("id", rowId)
        .select();
      if (error) {
        console.error(error);
      } else {
        setSelectedOperator("");

        // Update the local state to reflect the new status
        setInventory((inventory) =>
          inventory.map((item) => {
            if (item.id === rowId) {
              return { ...item, assignedTo: newOperator };
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
            .from("incidents")
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

      // Update the local state to remove the deleted itemss
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
        .from("incidents")
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
    } = formData;

    const item = {
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
    };
    // if selectedRows is empty, add item to database
    if (selectedRows.length === 0) {
      const { data, error } = await supabase
        .from("incidents")
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
        .from("incidents")
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
    event.stopPropagation();
    handleRowClick(rowItem);
  };

  const handleRowClick = (rowItem, index) => {
    setSelectedRowIndex(index);
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
              <col style={{ width: "60px" }} />
              <col style={{ width: "60px" }} />
              <col style={{ width: "1000px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "100px" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "160px" }} />
            </colgroup>
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2"></th>
                <th className="py-2">Image</th>
                <th className="py-2">Report</th>
                <th className="py-2">LPN Number</th>
                <th className="py-2">Date Created</th>
                <th className="py-2">Location</th>
                <th className="py-2">Submitted By</th>
                <th className="py-2">Resolved?</th>
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
                  onClick={() => handleRowClick(item, index)}
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
                  <td className="py-2 text-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="Thumbnail"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="py-2 text-center">{item.description}</td>
                  <td className="py-2 text-center">{item.barcodeData}</td>
                  <td className="py-2 text-center">{formatDate(item.date)}</td>
                  <td className="py-2 text-center">{item.location}</td>
                  <td className="py-2 text-center">{item.submittedBy}</td>

                  <td className="py-2 text-center">
                    {item.resolved === "Y" ? (
                      item.resolved
                    ) : (
                      <select
                        value={item.resolved || ""}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value)
                        }
                      >
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                      </select>
                    )}
                  </td>

                  <td className="py-2 text-center">
                    {item.resolved === "Y" ? (
                      item.assignedTo // Display the text value when the order is completed
                    ) : (
                      <select
                        value={item.assignedTo || ""}
                        onChange={(e) =>
                          handleOperatorChange(item.id, e.target.value)
                        }
                      >
                        <option value="">Select Operator</option>
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

      <div className="pagination text-center mt-3">
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
