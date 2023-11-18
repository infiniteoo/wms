import React, { useState } from "react";

import axios from "axios";

const UploadCSV = ({ setData }) => {
  const [csvData, setCsvData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileUpload = (e) => {
    e.preventDefault(); // Prevent the default form submission
    const file = e.target.files[0];

    if (!file) {
      setErrorMessage("Please select a CSV file.");
      return;
    }
    setFileSelected(true);

    // Create a new FormData object
    const formData = new FormData();
    formData.append("uploadedFile", file); // Append the file to the FormData object

    // Send the file to the server
    axios
      .post(
        process.env.NEXT_PUBLIC_ENV === "development"
          ? `/api/uploaded-file/uploaded-file`
          : `https://tecvex.com/api/uploaded-file`,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Specify the content type as form data
          },
        }
      )
      .then((response) => {
        setCsvData(response.data);
        setErrorMessage("");
        setFileSelected(false);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setErrorMessage("Error uploading file. Please try again.");
      });
  };

  return (
    <div>
      {!fileSelected ? (
        <label className="w-1/4 py-2 px-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer mt-2 bg-primary text-center">
          <span className="text-white">Upload CSV</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      ) : (
        <p className="text-gray-600 mt-2">File uploaded successfully!</p> // Updated to give user feedback on successful upload
      )}
    </div>
  );
};

export default UploadCSV;
