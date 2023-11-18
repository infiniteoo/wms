import { useState, useEffect } from "react";
import { startOfWeek, endOfWeek, addWeeks, format } from "date-fns";
import { calculateUserProfiles } from "./utils/userProfiles";
import { WEIGHTS } from "./utils/constants";

export const useData = (data, userObject) => {
  const [weeks, setWeeks] = useState([]);
  const [filteredData, setFilteredData] = useState(data || []);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [userProfiles, setUserProfiles] = useState([]);
  const [dateRange, setDateRange] = useState("");
  const [filteredUserObject, setFilteredUserObject] = useState(userObject);

  function convertToSeconds(timeStr) {
    const parts = timeStr.split(" ");
    let seconds = 0;
    parts.forEach((part) => {
      if (part.endsWith("m")) {
        seconds += parseInt(part) * 60; // convert minutes to seconds
      } else if (part.endsWith("s")) {
        seconds += parseInt(part); // add seconds
      }
    });
    return seconds;
  }

  useEffect(() => {
    const profiles = calculateUserProfiles(userObject, filteredData);

    // Calculate scores for each user
    const scoredProfiles = Object.entries(profiles).map(([user, profile]) => {
      let score = 0;
      score += profile.totalActions * WEIGHTS.totalActions;

      // If averageTimeBetweenActions is lower, the score is higher
      if (profile.averageTimeBetweenActions > 0) {
        score +=
          (1 / convertToSeconds(profile.averageTimeBetweenActions)) *
          WEIGHTS.avgTimeBetweenActions;
      }

      score += profile.palletPicks * WEIGHTS.palletPicks;
      score +=
        profile.undirectedFullInventoryMoves *
        WEIGHTS.undirectedFullInventoryMoves;
      score += profile.fluidLoads * WEIGHTS.fluidLoads;
      score += profile.listPicks * WEIGHTS.listPicks;
      score += profile.trailerLoads * WEIGHTS.trailerLoads;
      score += profile.asnReceives * WEIGHTS.asnReceives;

      return { user, score, ...profile };
    });

    const rankedProfiles = scoredProfiles.sort((a, b) => b.score - a.score);
    setUserProfiles(rankedProfiles);
  }, [userObject, filteredData]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Find the start date of the first week and the end date of the last week
    let startDate = startOfWeek(new Date(sortedData[0].date));
    const endDate = endOfWeek(new Date(sortedData[sortedData.length - 1].date));

    const calculatedWeeks = [];

    // Iterate over each week between the start and end dates
    while (startDate <= endDate) {
      const weekEndDate = endOfWeek(new Date(startDate));
      calculatedWeeks.push({
        start: new Date(startDate),
        end: new Date(weekEndDate),
      });
      startDate = addWeeks(new Date(startDate), 1); // Move to the next week
    }
    setWeeks(calculatedWeeks);
  }, [data]);

  useEffect(() => {
    if (!filteredUserObject || !filteredData) return;
    const profiles = calculateUserProfiles(filteredUserObject, filteredData);

    if (filteredData && filteredData.length > 0) {
      const minDate = new Date(
        Math.min(...filteredData.map((e) => new Date(e.date)))
      );
      const maxDate = new Date(
        Math.max(...filteredData.map((e) => new Date(e.date)))
      );
      setDateRange(
        `${format(minDate, "MMMM do yyyy")} - ${format(
          maxDate,
          "MMMM do yyyy"
        )}`
      );
    }
    // Calculate scores for each user
    const scoredProfiles = Object.entries(profiles).map(([user, profile]) => {
      let score = 0;
      score += profile.totalActions * WEIGHTS.totalActions;

      // If averageTimeBetweenActions is lower, the score is higher
      if (profile.averageTimeBetweenActions > 0) {
        score +=
          (1 / convertToSeconds(profile.averageTimeBetweenActions)) *
          WEIGHTS.avgTimeBetweenActions;
      }

      score += profile.palletPicks * WEIGHTS.palletPicks;
      score +=
        profile.undirectedFullInventoryMoves *
        WEIGHTS.undirectedFullInventoryMoves;
      score += profile.fluidLoads * WEIGHTS.fluidLoads;
      score += profile.listPicks * WEIGHTS.listPicks;
      score += profile.trailerLoads * WEIGHTS.trailerLoads;
      score += profile.asnReceives * WEIGHTS.asnReceives;

      return { user, score, ...profile };
    });
    const rankedProfiles = scoredProfiles.sort((a, b) => b.score - a.score);
    setUserProfiles(rankedProfiles);
  }, [filteredData, filteredUserObject]);

  useEffect(() => {
    let newFilteredData;
    if (selectedDay !== null) {
      newFilteredData = data.filter(
        (item) => format(new Date(item.date), "MMMM do yyyy") === selectedDay
      );
    } else {
      newFilteredData =
        selectedWeek !== null
          ? data.filter(
              (item) =>
                new Date(item.date) >= weeks[selectedWeek].start &&
                new Date(item.date) <= weeks[selectedWeek].end
            )
          : data;
    }
    setFilteredData(newFilteredData);

    // Check if newFilteredData is truthy before running forEach on it
    if (newFilteredData) {
      // Filter userObject based on the newFilteredData
      const newFilteredUserObject = {};
      newFilteredData.forEach((item) => {
        if (!newFilteredUserObject[item.user])
          newFilteredUserObject[item.user] = [];
        newFilteredUserObject[item.user].push(item);
      });
      setFilteredUserObject(newFilteredUserObject);
    }
  }, [selectedDay, selectedWeek, data, weeks]);

  return {
    weeks,
    filteredData,
    selectedWeek,
    setSelectedWeek,
    selectedDay,
    setSelectedDay,
    userProfiles,
    dateRange,
  };
};
