import { memo } from "react";

const Dropdown = ({ options, onChange, placeholder }) => {
  return (
    <select
      style={{ display: "block", zIndex: 50 }}
      onChange={onChange}
      defaultValue="placeholder"
    >
      <option value="placeholder" disabled hidden>
        {placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default memo(Dropdown);
