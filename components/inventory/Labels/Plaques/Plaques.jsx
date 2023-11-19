import { useState, useEffect } from "react";
import CompleteStopGroup from "./CompleteStopGroup.jsx";
import SubmitButton from "./SubmitButton.jsx";
import AddStopButton from "./AddStopButton.jsx";

import "./App.css";

function App() {
  const [numberOfStops, setNumberOfStops] = useState(1);
  const [definedStops, setDefinedStops] = useState([
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

  useEffect(() => {
    if (numberOfStops > definedStops.length) {
      const newStopsCount = numberOfStops - definedStops.length;
      let newStops = [];

      for (let i = 1; i <= newStopsCount; i++) {
        const newStop = {
          stopNumber: definedStops.length + i,
          itemNumber: "340226",
          itemDescription: "DG HH Hg UP",
          supplierBatchNumber: "00000000",
          productionDate: "090223",
          expirationDate: "090223",
          quantity: "80",
          unitOfMeasure: "CA",
          numberOfPallets: "1",
        };
        newStops.push(newStop);
      }

      setDefinedStops((prevDefinedStops) => [...prevDefinedStops, ...newStops]);
    }
  }, [numberOfStops]);

  return (
    <main className="flex h-full flex-col items-center justify-between w-screen  ">
      <div className="z-10 max-w-7xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        {definedStops.map((stop) => (
          <div
            key={stop.stopNumber}
            className="flex flex-col justify-center w-full max-w-full "
          >
            <CompleteStopGroup
              stop={stop}
              numberOfStops={numberOfStops}
              setNumberOfStops={setNumberOfStops}
              definedStops={definedStops}
              setDefinedStops={setDefinedStops}
            />
          </div>
        ))}

        <AddStopButton
          numberOfStops={numberOfStops}
          setNumberOfStops={setNumberOfStops}
          definedStops={definedStops}
          setDefinedStops={setDefinedStops}
        />

        <SubmitButton
          definedStops={definedStops}
          setDefinedStops={setDefinedStops}
          setNumberOfStops={setNumberOfStops}
        />
      </div>
    </main>
  );
}

export default App;
