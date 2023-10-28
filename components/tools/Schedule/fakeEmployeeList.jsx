export const fakeEmployeeList = () => {
  return (
    <form className="justify-center relative">
      <div className="mb-4">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="px-2 py-1 w-40 text-md"
          style={{ visibility: "hidden", pointerEvents: "none" }}
          disabled
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="px-2 py-1 w-40 text-md"
          style={{ visibility: "hidden", pointerEvents: "none" }}
          disabled
        />
      </div>
      <div className="mb-4">
        <label htmlFor="shift">Select Shift</label>
        <select
          id="shift"
          name="shift"
          className="px-2 py-1 w-40 text-md"
          style={{ visibility: "hidden", pointerEvents: "none" }}
          disabled
        >
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="endOfWeek">End of the Week</label>
        <select
          id="endOfWeek"
          name="endOfWeek"
          className="px-2 py-1 w-40 text-md"
          style={{ visibility: "hidden", pointerEvents: "none" }}
          disabled
        >
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-300 rounded p-2 text-md mb-2 text-white"
        style={{ visibility: "hidden", pointerEvents: "none" }}
        disabled
      >
        Add Employee
      </button>
    </form>
  );
};
