import React from "react";

interface DropdownOption {
  label: string;
  email: string;
  _id: string | number;
  value: string | number;
}

interface CustomDropdownProps {
  label?: string;
  placeholder?: string;
  hideDropdown?: boolean;
  options: DropdownOption[];
  selectedValue: string | number;
  onChange: (value: string | number) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onChange,
  selectedValue,
  label = "Status",
  hideDropdown = false,
  placeholder = "Select a option...",
}) => {
  if (hideDropdown) return null;
  return (
    <div className="flex flex-col gap-1 w-48">
      {label && <label className="text-iconBlack font-medium text-xs">{label}:</label>}
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 text-xs py-1.5 rounded-lg text-iconBlack outline-none focus:ring-2 focus:ring-primary/50 text-iconBlack bg-whiteBg border-secondary"
      >
        {placeholder && options && options.length > 0 && (
          <option value="">{placeholder}</option>
        )}
        {options && options.length > 0 ? (
          options?.map((option, index) => (
            <option key={index} value={option.label}>
              {option.value} {option?.email && `(${option?.email})`}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No Data Available
          </option>
        )}
      </select>
    </div>
  );
};

export default CustomDropdown;
