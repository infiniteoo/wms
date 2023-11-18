export const separateByUser = (data) => {
  const excludedUsers = ["UNKNOWN", "REPLENMGR", "NOUSER", "D"];
  const userObj = data.reduce((acc, cur) => {
    const user = cur.user;
    // Skip adding to userObj if user is in the excludedUsers list
    if (excludedUsers.includes(user)) return acc;

    if (!acc[user]) acc[user] = [];
    acc[user].push(cur);
    return acc;
  }, {});
  return userObj;
};
