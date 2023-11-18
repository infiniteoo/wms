export const convertMillisecondsToReadableTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
};

export const calculateUserProfiles = (userObject) => {
  const userProfiles = {};

  for (const user in userObject) {
    if (Object.hasOwnProperty.call(userObject, user)) {
      const actions = userObject[user];

      let totalActions = 0;
      let totalDays = 0;
      let totalDailyAverageTimeBetweenActions = 0;
      let actionsByDay = {};
      let totalTimeBetweenActions = 0;
      let lastActionTime = null;
      let palletPicks = 0;
      let undirectedFullInventoryMoves = 0;
      let fluidLoads = 0;
      let listPicks = 0;
      let trailerLoads = 0;
      let asnReceives = 0;
      let inventoryAttributeChange = 0;

      actions.forEach((action) => {
        totalActions++;
        const date = action.date;
        if (!actionsByDay[date]) actionsByDay[date] = [];
        actionsByDay[date].push(action);
        // Combine date and time and convert to Date object
        const actionDateTime = new Date(`${action.date} ${action.time}`);

        if (lastActionTime) {
          const timeBetweenActions = actionDateTime - lastActionTime;
          totalTimeBetweenActions += timeBetweenActions;
        }
        lastActionTime = actionDateTime;

        switch (action.activity) {
          case "Pallet Pick":
            palletPicks++;
            break;
          case "Undirected Full Inventory Move":
            undirectedFullInventoryMoves++;
            break;
          case "Fluid Load":
            fluidLoads++;
            break;
          case "List Pick":
            listPicks++;
            break;
          case "Trailer load":
            trailerLoads++;
            break;
          case "Non-Trusted ASN":
            asnReceives++;
            break;
          case "Inventory Attribute Change":
            inventoryAttributeChange++;
            break;
          default:
            break;
        }
      });

      for (const date in actionsByDay) {
        const dailyActions = actionsByDay[date].sort(
          (a, b) =>
            new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
        );
        let dailyTotalTimeBetweenActions = 0;
        for (let i = 1; i < dailyActions.length; i++) {
          const timeDifference =
            new Date(`${dailyActions[i].date} ${dailyActions[i].time}`) -
            new Date(`${dailyActions[i - 1].date} ${dailyActions[i - 1].time}`);
          dailyTotalTimeBetweenActions += timeDifference;
        }
        const dailyAverageTimeBetweenActions =
          dailyActions.length > 1
            ? dailyTotalTimeBetweenActions / (dailyActions.length - 1)
            : 0;
        totalDailyAverageTimeBetweenActions += dailyAverageTimeBetweenActions;
        totalDays++;
      }

      const averageTimeBetweenActions =
        totalDays > 0
          ? convertMillisecondsToReadableTime(
              totalDailyAverageTimeBetweenActions / totalDays
            )
          : "0m 0s";

      userProfiles[user] = {
        totalActions,
        averageTimeBetweenActions, // This will now be a string in the format "Xm Ys"
        palletPicks,
        undirectedFullInventoryMoves,
        fluidLoads,
        listPicks,
        trailerLoads,
        asnReceives,
        inventoryAttributeChange,
      };
    }
  }

  return userProfiles;
};
