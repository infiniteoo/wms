function formatDateToMMDDYY(inputDate) {
  // Parse the input date string into a Date object
  const dateObj = new Date(inputDate + "T00:00:00Z");

  // Extract day, month, and year components
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1; // Adding 1 because months are zero-based
  const year = dateObj.getUTCFullYear() % 100; // Extract the last two digits of the year

  // Format the components into "MMDDYY" format
  const formattedDate = `${String(month).padStart(2, "0")}${String(
    day
  ).padStart(2, "0")}${String(year).padStart(2, "0")}`;

  return formattedDate;
}

module.exports = formatDateToMMDDYY;
