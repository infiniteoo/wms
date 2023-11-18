import React, { useState, useCallback } from "react";
import Loading from "./Loading";
import UndirectedFullInventoryMove from "./charts/UndirectedFullInventoryMove";
import PalletPick from "./charts/PalletPick";
import FluidLoadPalletPick from "./charts/FluidLoadPalletPick";
import TrailerLoad from "./charts/TrailerLoad";
import ListPick from "./charts/ListPick";
import ItemsShipped from "./charts/ItemsShipped";
import NonTrustedASNUndirectedReceive from "./charts/NonTrustedASNUndirectedReceive";
import InventoryAttributeChange from "./charts/InventoryAttributeChange";
import DateRange from "./charts/DateRange";

const Modal = React.lazy(() => import("./charts/Modal"));

import { format } from "date-fns";
import Dropdown from "./Dropdown";
import UserProfiles from "./UserProfiles";
import { useData } from "./useData";

const DataDisplay = ({ data, userObject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChart, setCurrentChart] = useState(null);

  const {
    weeks,
    filteredData,
    selectedWeek,
    setSelectedWeek,
    selectedDay,
    setSelectedDay,
    userProfiles,
    dateRange,
  } = useData(data, userObject);

  const openModalWithChart = useCallback((chart) => {
    setCurrentChart(chart);
    setIsModalOpen(true);
  }, []);

  if (!filteredData || filteredData.length === 0) return <Loading />;

  return (
    <>
      <div className="flex justify-around space-x-4 mb-4 mt-5">
        <DateRange dateRange={dateRange} />

        <div></div>
        <div className="flex flex-row  space-x-4 mb-4">
          <Dropdown
            options={[
              { value: "all", label: "Show All" },
              ...weeks.map((week, index) => ({
                value: index,
                label: `${format(week.start, "MMMM do yyyy")} - ${format(
                  week.end,
                  "MMMM do yyyy"
                )}`,
              })),
            ]}
            onChange={(e) => {
              if (e.target.value === "all") {
                setSelectedWeek(null);
                setSelectedDay(null);
              } else {
                setSelectedWeek(Number(e.target.value));
                setSelectedDay(null);
              }
            }}
            placeholder="Select Week"
          />

          <Dropdown
            options={[
              { value: "all", label: "Show All" },
              ...[
                ...new Set(
                  filteredData.map((item) =>
                    format(new Date(item.date), "MMMM do yyyy")
                  )
                ),
              ]
                .sort((a, b) => new Date(a) - new Date(b))
                .map((day) => ({ value: day, label: day })),
            ]}
            onChange={(e) =>
              setSelectedDay(e.target.value === "all" ? null : e.target.value)
            }
            placeholder="Select Day"
          />
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="flex justify-center mb-2 section-title" id="stats">
        <h1 className="text-2xl font-bold text-center w-100">
          Loading/Unloading Trucks
        </h1>
      </div>

      <div
        className="flex flex-wrap justify-center w-full gap-8 relative z-50"
        style={{ zIndex: 50, position: "relative" }}
      >
        <div
          className="w-1/4 chart-card relative z-50"
          onClick={() =>
            openModalWithChart(
              <PalletPick data={filteredData} userObject={userObject} />
            )
          }
        >
          <PalletPick data={filteredData} userObject={userObject} />
        </div>
        <div
          className="w-1/4 chart-card relative z-50"
          onClick={() =>
            openModalWithChart(
              <ListPick data={filteredData} userObject={userObject} />
            )
          }
        >
          <ListPick data={filteredData} userObject={userObject} />
        </div>
        <div
          className="w-1/4 chart-card relative z-50"
          onClick={() =>
            openModalWithChart(
              <FluidLoadPalletPick
                data={filteredData}
                userObject={userObject}
              />
            )
          }
        >
          <FluidLoadPalletPick data={filteredData} userObject={userObject} />
        </div>

        <div
          className="w-1/4 chart-card relative z-50"
          onClick={() =>
            openModalWithChart(
              <TrailerLoad data={filteredData} userObject={userObject} />
            )
          }
        >
          <TrailerLoad data={filteredData} userObject={userObject} />
        </div>
        <div
          className="w-1/4 chart-card relative z-50"
          onClick={() =>
            openModalWithChart(
              <NonTrustedASNUndirectedReceive
                data={filteredData}
                userObject={userObject}
              />
            )
          }
        >
          <NonTrustedASNUndirectedReceive
            data={filteredData}
            userObject={userObject}
          />
        </div>
      </div>

      <div
        className="flex justify-center mb-2 mt-10 section-title"
        id="inventory"
      >
        <h1 className="text-2xl font-bold text-center mt-10">
          Inventory Stats
        </h1>
      </div>
      <div
        className="flex flex-wrap justify-center w-full gap-8 relative z-50"
        style={{ zIndex: 50, position: "relative" }}
      >
        <div
          style={{ zIndex: 50, position: "relative" }}
          className="w-1/4 chart-card relative z-50"
          onClick={() =>
            openModalWithChart(
              <UndirectedFullInventoryMove
                data={filteredData}
                userObject={userObject}
              />
            )
          }
        >
          <UndirectedFullInventoryMove
            data={filteredData}
            userObject={userObject}
          />
        </div>
        <div
          className="w-1/4 chart-card relative z-50"
          onClick={() =>
            openModalWithChart(
              <ItemsShipped
                data={filteredData}
                userObject={userObject}
                isInModal={true}
              />
            )
          }
        >
          <ItemsShipped data={filteredData} userObject={userObject} />
        </div>
        <div
          className="w-1/4 chart-card relative z-50"
          onClick={() =>
            openModalWithChart(
              <InventoryAttributeChange
                data={filteredData}
                userObject={userObject}
                isInModal={true}
              />
            )
          }
        >
          <InventoryAttributeChange
            data={filteredData}
            userObject={userObject}
          />
        </div>
      </div>

      <div
        className="flex justify-center mb-2 mt-10 section-title"
        id="profiles"
      >
        <h1 className="text-2xl font-bold text-center mt-10">
          Individual Profiles
        </h1>
      </div>
      <div
        className="flex flex-wrap justify-center w-full gap-8 relative z-50"
        style={{ zIndex: 50, position: "relative" }}
      >
        {userProfiles.map((profile, index) => (
          <UserProfiles key={profile.user} profile={profile} rank={index + 1} />
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>{currentChart}</Modal>
      )}
    </>
  );
};

export default DataDisplay;
