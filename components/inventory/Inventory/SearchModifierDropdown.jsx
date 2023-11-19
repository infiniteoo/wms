const SearchModifierDropdown = ({ setModifier }) => {
  const handleChange = (event) => {
    setModifier(event.target.value);
    console.log(event.target.value);
  };
  return (
    <select
      id="action-dropdown"
      className="bg-white border rounded px-2 py-1"
      onChange={handleChange}
      defaultValue=""
    >
      <option value="" disabled hidden>
        Modifier
      </option>
      <option value="item_number">Item Number</option>
      <option value="description">Description</option>
      <option value="lpn_number">LPN Number</option>
      <option value="lot_number">Lot Number</option>
      <option value="status">Status</option>
      <option value="location">Location</option>
    </select>
  );
};

export default SearchModifierDropdown;
