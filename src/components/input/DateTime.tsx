import React, { FC, useEffect, useRef } from "react";

interface DateTimeProps {
    field: {
        name: string;
        label: string;
        value?: string; // Full date-time string like "2025-08-13T15:30"
        currentDateTime?: string; // Default date-time
        required?: boolean;
        placeholder?: string;
        isDisabled?: boolean;
        defaultValue?: string;
        minDateTime?: string; // "2025-08-13T09:00"
        maxDateTime?: string; // "2025-08-13T18:00"
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const DateTime: FC<DateTimeProps> = ({ field, handleInputChange, className }) => {
    const hasUpdated = useRef(false);

    const toExactDateTime = (isoString?: string) => {
        if (!isoString) return "";
        const noZ = isoString.replace(/Z$/, "");
        return noZ.slice(0, 16);
    };

    useEffect(() => {
        if (field.currentDateTime && !field.value && !hasUpdated.current) {
            const syntheticEvent = {
                target: {
                    name: field.name,
                    value: field.currentDateTime,
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
                className="block font-medium text-gray-700 mb-2 text-[11px]"
            >
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
                type="datetime-local"
                id={field.name}
                name={field.name}
                min={field.minDateTime}
                max={field.maxDateTime}
                required={field.required}
                disabled={field.isDisabled}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                value={toExactDateTime(field.value || field.currentDateTime)}
                className={`border border-gray-300 text-black placeholder:text-gray-400 rounded-lg text-xs p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
            />
        </div>
    );
};

export default DateTime;
