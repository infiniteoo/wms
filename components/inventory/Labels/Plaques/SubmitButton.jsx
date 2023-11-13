import React, { useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const SubmitButton = ({ definedStops, setDefinedStops, setNumberOfStops }) => {
  const [pdfData, setPdfData] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state

  const generateImage = async (textToGenerate) => {
    try {
      let result = await axios.post(
        process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
          ? `/api/generateImage/${textToGenerate}`
          : `https://greatblue.netlify.app/api/generateImage/${textToGenerate}`
      );
      if (result.status === 200) {
        console.log("Image generated successfully for", textToGenerate);
      }
    } catch (error) {
      console.error(`Error generating image for ${textToGenerate}:`, error);
    }
  };

  const generatePdfAndImages = async (parsedData) => {
    try {
      /* console.log("parsedData", parsedData); */
      setLoading(true); // Set loading to truea
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
    } catch (error) {
      console.log(error);
    }

    try {
      setLoading(true);
      let response = await axios.post(
        process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
          ? `/api/stops/stops`
          : "https://greatblue.netlify.app/api/stops/stops",
        parsedData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfData(pdfUrl);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after API call
      setShowButton(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await generatePdfAndImages(definedStops);
      setDefinedStops([
        {
          itemNumber: "340226",
          itemDescription: "DG HH Hg UP",
          supplierBatchNumber: "00000000",
          productionDate: "090223",
          expirationDate: "090223",
          quantity: "80",
          unitOfMeasure: "CA",
          numberOfPallets: "1",
          stopNumber: 1,
        },
      ]);
      setNumberOfStops(1);
      setShowButton(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {showButton &&
        !loading && ( // Conditional rendering based on showButton and not loading
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-full shadow-md transition duration-300 ease-in-out mt-1"
            onClick={handleSubmit}
          >
            Generate PDF
          </button>
        )}
      {loading && ( // Show loader when loading is true
        <div className="mt-4 text-center">
          <p className="text-bold text-lg">Loading...</p>
          <BeatLoader
            css={override}
            size={50}
            color={"red"}
            loading={loading}
          />
        </div>
      )}
      {pdfData && (
        <div className="text-center">
          <p className="text-lg text-center">
            PDF generated! Choose an option:
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-full shadow-md transition duration-300 ease-in-out mt-2">
            <a href={pdfData} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-full shadow-md transition duration-300 ease-in-out mt-2 ml-2">
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
      )}
    </div>
  );
};

export default SubmitButton;
