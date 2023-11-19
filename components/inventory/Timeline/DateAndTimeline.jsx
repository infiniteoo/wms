const DateAndTimeline = ({ dateAndTimeline }) => {
  return (
    <div>
      <table className="table-auto w-full">
        <thead className="table-header">
          <tr>
            <th>Date</th>
            <th className="">Time</th>
          </tr>
        </thead>
        <tbody className="">
          {dateAndTimeline.map((row, index) => (
            <tr
              key={index}
              className="flex justify-between items-center text-center"
            >
              <td className="date-column">{row[0]}</td>
              <td className="time-column">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DateAndTimeline;
