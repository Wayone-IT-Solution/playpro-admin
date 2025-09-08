import React, { FC, useEffect, useRef } from "react";

interface TimeProps {
    field: {
        name: string;
        label: string;
        value?: string;
        currentTime?: string; // Default time 
        required?: boolean;
        placeholder?: string;
        isDisabled?: boolean;
        defaultValue?: string;
        minTime?: string; // e.g., "09:00"
        maxTime?: string; // e.g., "18:00"
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Time: FC<TimeProps> = ({ field, handleInputChange, className }) => {
    const hasUpdated = useRef(false);

    useEffect(() => {
        if (field.currentTime && !field.value && !hasUpdated.current) {
            const syntheticEvent = {
                target: {
                    name: field.name,
                    value: field.currentTime,
                },
            } as unknown as React.ChangeEvent<HTMLInputElement>;

            handleInputChange(syntheticEvent);
            hasUpdated.current = true;
        }
    }, [field, handleInputChange]);

    return (
        <div className="relative">
            <label
                htmlFor={field.name}
                className="block font-medium text-gray-700 mb-2"
            >
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
                type="time"
                id={field.name}
                name={field.name}
                min={field.minTime}
                max={field.maxTime}
                required={field.required}
                disabled={field.isDisabled}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                value={field?.value || field.currentTime || ""}
                className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 text-black placeholder:text-gray-400 focus:ring-blue-500 focus:border-transparent ${className}`}
            />
        </div>
    );
};

export default Time;
