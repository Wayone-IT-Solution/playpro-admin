import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CalendarSidebarProps {
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const handleDateChange = (months: number) => {
    setSelectedDate(selectedDate.add(months, "month"));
  };

  const startDate = dayjs(selectedDate).startOf("month").startOf("week");

  return (
    <div className="w-1/3 p-5 pl-0 h-fit sticky top-[10%]">
      {/* Day & Full Date */}
      <div className="mb-2 flex items-center bg-infobg p-2 rounded-xl gap-4">
        {/* Date Square */}
        <div className="w-14 h-14 bg-primary rounded-md flex flex-col items-center justify-center shadow-sm">
          <div className="text-[10px] text-white uppercase leading-none">
            {selectedDate.format("MMM")}
          </div>
          <div className="text-lg font-semibold text-white">
            {selectedDate.format("D")}
          </div>
        </div>

        {/* Full Date Details */}
        <div>
          <div className="text-lg font-semibold text-iconBlack">
            {selectedDate.format("MMMM D, YYYY")}
          </div>
          <div className="text-sm text-iconBlack">
            {selectedDate.format("dddd")}
          </div>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={() => handleDateChange(-1)}
          className="p-2 rounded hover:bg-infobg border border-infobg transition"
          aria-label="Previous Month"
        >
          <FaChevronLeft className="text-iconBlack" />
        </button>
        <span className="text-sm font-semibold text-iconBlack">
          {selectedDate.format("MMMM YYYY")}
        </span>
        <button
          onClick={() => handleDateChange(1)}
          className="p-2 rounded hover:bg-infobg border border-infobg transition"
          aria-label="Next Month"
        >
          <FaChevronRight className="text-iconBlack" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-400 uppercase mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i}>{dayjs().weekday(i).format("dd")}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 border border-infobg rounded-xl p-4 text-sm gap-y-2">
        {Array.from({ length: 42 }).map((_, i) => {
          const day = startDate.add(i, "day");
          const isCurrentMonth = day.month() === selectedDate.month();
          const isSelected = day.isSame(selectedDate, "day");

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(day)}
              className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full transition
                ${isSelected ? "bg-infobg text-iconBlack text-lg font-bold" : ""}
                ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                ${!isSelected && "hover:bg-iconBlack hover:text-primary"}
              `}
            >
              {day.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarSidebar;
