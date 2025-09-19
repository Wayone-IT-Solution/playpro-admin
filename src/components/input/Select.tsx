import React, { FC } from "react";

interface Option {
  value: string | number;
  label: string | number;
  email?: string | number;
}

interface SelectProps {
  field: {
    name?: string;
    label?: string;
    value?: string;
    required?: boolean;
    options?: Option[];
    placeholder?: string;
    isDisabled?: boolean;
    isMultiple?: boolean;
    defaultValue?: string | number;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const Select: FC<SelectProps> = ({ field, handleInputChange, className }) => {
  return (
    <div className="relative">
      <label
        htmlFor={field.name}
        className="block font-medium text-gray-700 mb-2"
      >
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={field.name}
        name={field.name}
        required={field.required}
        disabled={field.isDisabled}
        multiple={field.isMultiple}
        onChange={handleInputChange}
        value={field.options && field.options.length > 0 ? field?.value : ""}
        className={`border cursor-pointer border-gray-300 rounded-lg no-scrollbar p-2.5 w-full text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className} ${field?.isMultiple && "h-48"
          }`}
      >
        {field.placeholder && field.options && field.options.length > 0 && (
          <option value="" disabled={field.required} className="bg-gray-100 px-2 py-1 rounded-md mb-1.5">{field.placeholder}</option>
        )}
        {field.options && field.options.length > 0 ? (
          field.options?.map((option, index) => (
            <option key={index} value={option.label} className="text-sm">
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

export default Select;
