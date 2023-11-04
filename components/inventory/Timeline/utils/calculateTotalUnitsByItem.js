export const calculateTotalUnitsByItem = ({
  timelineData,
  timelineA,
  timelineB,
  timelineC,
}) => {
  const totalUnitsByItem = {}
  const currentTime = new Date()

  const processRow = (row) => {
    const rowDate = new Date(`${row[0]} ${row[1]}`)
    const item = row[3]
    const qty = row[5]

    if (rowDate <= currentTime) {
      if (!totalUnitsByItem[item]) {
        totalUnitsByItem[item] = {
          totalMade: 0,
          totalRemaining: 0,
          instances: [],
        }
      }

      totalUnitsByItem[item].totalMade += qty
      totalUnitsByItem[item].instances.push(row)
    }
  }

  const processTimeline = (timeline) => {
    for (let index = 0; index < timeline.length; index++) {
      const row = timeline[index]
      processRow(row)

      const item = row[3]
      for (let j = index + 1; j < timeline.length; j++) {
        if (timeline[j][3] === item) {
          totalUnitsByItem[item].totalRemaining += timeline[j][5]
        } else {
          break
        }
      }
    }
  }

  ;[timelineA, timelineB, timelineC].forEach((timeline) => {
    processTimeline(timeline)
  })

  for (const item in totalUnitsByItem) {
    const { totalMade, totalRemaining } = totalUnitsByItem[item]
    totalUnitsByItem[item].totalToBeCreated = totalMade + totalRemaining
  }
  console.log('total units by item : ', totalUnitsByItem)
  return totalUnitsByItem
}
