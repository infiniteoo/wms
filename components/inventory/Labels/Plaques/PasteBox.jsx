import React, { useState, useEffect } from "react";
import parseData from "./parseData.js";
import axios from "axios";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const PasteBox = ({ value, onChange }) => {
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pasteBoxValue, setPasteBoxValue] = useState(value);

  useEffect(() => {
    setPasteBoxValue("");
  }, [pasteBoxValue]);

  const generateImage = async (textToGenerate) => {
    try {
      await axios.post(
        process.env.REACT_APP_ENVIRONMENT === "development"
          ? `http://localhost:8156/api/generateImage/${textToGenerate}`
          : `https://fgftags.com/api/generateImage/${textToGenerate}`,
        textToGenerate
      );
    } catch (error) {
      console.error(`Error generating image for ${textToGenerate}:`, error);
    }
  };

  const generatePdfAndImages = async (parsedData) => {
    try {
      setLoading(true);
      for (const item of parsedData) {
        if (item.itemNumber) {
          await generateImage(item.itemNumber);
        }
        if (item.supplierBatchNumber) {
          await generateImage(item.supplierBatchNumber);
        }
        if (item.productionDate) {
          await generateImage(item.productionDate);
        }
        if (item.expirationDate) {
          await generateImage(item.expirationDate);
        }
      }

      const response = await axios.post(
        process.env.REACT_APP_ENVIRONMENT === "development"
          ? "http://localhost:8156/api/copypasta"
          : "https://fgftags.com/api/copypasta",
        parsedData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setPdfData(pdfUrl);
      setLoading(false);
      setPasteBoxValue(""); // Clear the input box content
    } catch (error) {
      console.log(error);
      setLoading(false);
      setPasteBoxValue("");
    }
  };

  const handleChange = async (event) => {
    try {
      const parsedData = parseData(event.target.value);

      await generatePdfAndImages(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label
        htmlFor="price"
        className="block text-sm font-medium leading-6 text-gray-900 mt-10"
      >
        .. Or Paste Data Here
      </label>
      <input
        type="text"
        value={pasteBoxValue}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      {loading ? (
        <div className="mt-4 text-center">
          <p className="text-bold text-lg">Loading...</p>
          <BeatLoader
            css={override}
            size={50}
            color={"red"}
            loading={loading}
          />
        </div>
      ) : (
        pdfData && (
          <div className="text-center">
            <p className="text-bold text-lg mt-5">
              PDF generated! Choose an option:
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-full shadow-md transition duration-300 ease-in-out mt-2">
              <a href={pdfData} target="_blank" rel="noopener noreferrer">
                View PDF
              </a>{" "}
            </button>{" "}
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-full shadow-md transition duration-300 ease-in-out mt-2">
              <a
                href={pdfData}
                download="export.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download PDF
              </a>
            </button>
          </div>
        )
      )}
    </>
  );
};

export default PasteBox;
