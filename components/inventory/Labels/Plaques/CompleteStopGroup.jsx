import NumberOfPalletsDropDown from "./NumberOfPalletsDropDown";
import SupplierBatchNumberInput from "./SupplierBatchNumberInput";
import StopNumber from "./StopNumber";
import ItemNameDropDown from "./ItemNameDropDown";
import storeNames from "./itemNames.js";
import ProductionDatePicker from "./ProductionDatePicker";
import ExpirationDatePicker from "./ExpirationDatePicker";
import QuantityNumberInput from "./QuantityDropBox";
import UOMDropBox from "./UnitOfMeasureDropDown";

const CompleteStopGroup = ({
  numberOfStops,
  setNumberOfStops,
  stop,
  setDefinedStops,
  definedStops,
}) => {
  return (
    <div className=" py-2 px-5 flex flex-col">
      <div className="flex flex-row items-center justify-around w-full">
        <StopNumber
          numberOfStops={numberOfStops}
          setNumberOfStops={setNumberOfStops}
          stop={stop.stopNumber}
          setDefinedStops={setDefinedStops}
          definedStops={definedStops}
        />
        <ItemNameDropDown
          options={storeNames}
          numberOfStops={numberOfStops}
          setNumberOfStops={setNumberOfStops}
          stop={stop}
          setDefinedStops={setDefinedStops}
          definedStops={definedStops}
        />

        <NumberOfPalletsDropDown
          numberOfStops={numberOfStops}
          setNumberOfStops={setNumberOfStops}
          stop={stop}
          setDefinedStops={setDefinedStops}
          definedStops={definedStops}
        />
        <SupplierBatchNumberInput
          numberOfStops={numberOfStops}
          setNumberOfStops={setNumberOfStops}
          stop={stop}
          setDefinedStops={setDefinedStops}
          definedStops={definedStops}
        />
        <ProductionDatePicker
          numberOfStops={numberOfStops}
          setNumberOfStops={setNumberOfStops}
          stop={stop}
          setDefinedStops={setDefinedStops}
          definedStops={definedStops}
        />
        <ExpirationDatePicker
          numberOfStops={numberOfStops}
          setNumberOfStops={setNumberOfStops}
          stop={stop}
          setDefinedStops={setDefinedStops}
          definedStops={definedStops}
        />
        <QuantityNumberInput
          numberOfStops={numberOfStops}
          setNumberOfStops={setNumberOfStops}
          stop={stop}
          setDefinedStops={setDefinedStops}
          definedStops={definedStops}
        />
        <UOMDropBox
          numberOfStops={numberOfStops}
          setNumberOfStops={setNumberOfStops}
          stop={stop}
          setDefinedStops={setDefinedStops}
          definedStops={definedStops}
        />
      </div>
    </div>
  );
};

export default CompleteStopGroup;
