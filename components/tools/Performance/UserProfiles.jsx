import React from "react";

const UserProfiles = ({ profile, rank }) => {
  return (
    <div className="w-1/4 p-4 bg-white shadow-md rounded-md flex flex-col items-center">
      <div className="flex items-center mb-4">
        <img
          src="/profile_placeholder.jpg"
          alt="Profile Placeholder"
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4 text-center">
          <h2 className="text-2xl font-bold">{profile.user}</h2>
          <p className="text-xl">
            Rank: <strong>{rank}</strong>
          </p>
        </div>
      </div>
      <p>
        Total Actions: <strong>{profile.totalActions}</strong>
      </p>
      <p>
        Avg Time Between Actions:{" "}
        <strong>{profile.averageTimeBetweenActions}</strong>
      </p>
      <p>
        Pallet Picks: <strong>{profile.palletPicks}</strong>
      </p>
      <p>
        Undirected Full Inventory Moves:{" "}
        <strong>{profile.undirectedFullInventoryMoves}</strong>
      </p>
      <p>
        Fluid Loads: <strong>{profile.fluidLoads}</strong>
      </p>
      <p>
        List Picks: <strong>{profile.listPicks}</strong>
      </p>
      <p>
        Trailer Loads: <strong>{profile.trailerLoads}</strong>
      </p>
      <p>
        ASN Receives: <strong>{profile.asnReceives}</strong>
      </p>
      <p>
        Inventory Attribute Changes:{" "}
        <strong>{profile.inventoryAttributeChange}</strong>
      </p>
    </div>
  );
};

export default UserProfiles;
