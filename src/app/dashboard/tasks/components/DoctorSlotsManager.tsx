import SlotBookingUI from "./SlotBookingUI";
import { Fetch, Post } from "@/hooks/apiUtils";
import React, { useState, useEffect, useCallback } from "react";
import {
  FiPlus,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiUser,
  FiSave,
  FiEye,
  FiCopy,
} from "react-icons/fi";

interface Doctor {
  value: string;
  label: string;
  email: string;
}

interface Slot {
  id: number;
  endTime: string;
  groundId: string;
  duration: number;
  startTime: string;
  useRecurring: boolean;
  selectedDays: string[];
  selectedDates: string[];
  amount: any;
}

const DoctorSlotsManager = () => {
  const initialSlot: Slot = {
    amount: "",
    endTime: "",
    groundId: "",
    duration: 30,
    startTime: "",
    id: Date.now(),
    selectedDays: [],
    selectedDates: [],
    useRecurring: false,
  };

  const [previous, setPrevious] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [grounds, setGrounds] = useState<Doctor[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([initialSlot]);
  const [selectedDoctor, setSelectedDoctor] = useState<any>("");

  useEffect(() => {
    const fetchGround = async () => {
      try {
        const response: any = await Fetch(
          "/api/ground/admin",
          { limit: 10000, page: 1 },
          5000,
          true,
          false
        );
        if (response?.success) {
          const formattedDoctors = response?.data?.result;
          setGrounds(formattedDoctors);
        }
      } catch (error) {
        console.log("Error fetching grounds:", error);
      }
    };
    fetchGround();
  }, []);

  const fetchGroundSlots = useCallback(async () => {
    try {
      setPrevious([]);
      const response: any = await Fetch(
        "/api/slot",
        {
          groundId: selectedDoctor,
          ...(selectedDate ? { date: selectedDate } : {}),
        },
        5000,
        true,
        false
      );
      if (response?.success) setPrevious(response?.data);
    } catch (error) {
      console.log("Error fetching grounds:", error);
    }
  }, [selectedDoctor, selectedDate]);

  useEffect(() => {
    if (selectedDoctor) fetchGroundSlots();
  }, [selectedDoctor, fetchGroundSlots]);

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const addSlot = () => {
    setSlots([
      ...slots,
      {
        ...initialSlot,
        id: Date.now(),
      },
    ]);
  };

  const updateSlot = (id: number, field: keyof Slot, value: any) => {
    setSlots(
      slots.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot))
    );
  };

  const calculateEndTime = (startTime: string, duration: number): string => {
    if (!startTime || !duration) return "";

    const [hours, minutes] = startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMins = totalMinutes % 60;

    return `${endHours.toString().padStart(2, "0")}:${endMins
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartTimeChange = (id: number, startTime: string) => {
    setSlots(
      slots.map((slot) => {
        if (slot.id === id) {
          const endTime = calculateEndTime(startTime, slot.duration);
          return { ...slot, startTime, endTime };
        }
        return slot;
      })
    );
  };

  const handleDurationChange = (id: number, duration: string) => {
    const durationNum = parseInt(duration, 10);
    setSlots(
      slots.map((slot) => {
        if (slot.id === id) {
          const endTime = calculateEndTime(slot.startTime, durationNum);
          return { ...slot, duration: durationNum, endTime };
        }
        return slot;
      })
    );
  };

  const handleDaySelection = (
    slotId: number,
    day: string,
    isSelected: boolean
  ) => {
    setSlots(
      slots.map((slot) => {
        if (slot.id === slotId) {
          let updatedDays = [...slot.selectedDays];
          let updatedDates = [...slot.selectedDates];

          if (isSelected) {
            if (!updatedDays.includes(day)) {
              updatedDays.push(day);
              const nextDate = getNextDateForDay(day);
              if (!updatedDates.includes(nextDate)) {
                updatedDates.push(nextDate);
              }
            }
          } else {
            updatedDays = updatedDays.filter((d) => d !== day);
            const nextDate = getNextDateForDay(day);
            updatedDates = updatedDates.filter((d) => d !== nextDate);
          }

          return {
            ...slot,
            selectedDays: updatedDays,
            selectedDates: updatedDates.sort(),
          };
        }
        return slot;
      })
    );
  };

  const handleDateSelection = (slotId: number, dateString: string) => {
    setSlots(
      slots.map((slot) => {
        if (slot.id === slotId) {
          const updatedDates = slot.selectedDates.includes(dateString)
            ? slot.selectedDates.filter((d) => d !== dateString)
            : [...slot.selectedDates, dateString];

          return { ...slot, selectedDates: updatedDates };
        }
        return slot;
      })
    );
  };

  const addDateToSlot = (slotId: number, dateInput: string) => {
    if (!dateInput) return;

    setSlots(
      slots.map((slot) => {
        if (slot.id === slotId) {
          const updatedDates = slot.selectedDates.includes(dateInput)
            ? slot.selectedDates
            : [...slot.selectedDates, dateInput].sort();

          const day = getDayFromDate(dateInput);
          const updatedDays = slot.selectedDays.includes(day)
            ? slot.selectedDays
            : [...slot.selectedDays, day];

          return {
            ...slot,
            selectedDates: updatedDates,
            selectedDays: updatedDays,
          };
        }
        return slot;
      })
    );
  };

  const validateSlots = (): boolean => {
    return slots.every((slot) => {
      const hasValidTime =
        slot.startTime &&
        slot.endTime &&
        slot.duration >= 15 &&
        slot.duration <= 180;
      const hasValidDoctor = !!slot.groundId;
      const hasValidDates = slot.useRecurring
        ? slot.selectedDays.length > 0
        : slot.selectedDates.length > 0;

      return hasValidTime && hasValidDoctor && hasValidDates;
    });
  };

  function getWeekDay(date: string | Date): string {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date(date);
    return days[d.getDay()];
  }

  function getUpcomingDateByDay(
    dayName: string,
    fromDate: Date = new Date()
  ): Date {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Normalize both to lowercase
    const targetDay = days.findIndex(
      (d) => d.toLowerCase() === dayName.toLowerCase()
    );

    if (targetDay === -1) throw new Error("Invalid day name");

    const date = new Date(fromDate);
    const currentDay = date.getDay();

    // Calculate days until next target day
    let diff = targetDay - currentDay;
    if (diff <= 0) diff += 7; // ensures it's upcoming, not today or past

    date.setDate(date.getDate() + diff);
    return date;
  }

  const prepareApiData = () => {
    return slots.flatMap((slot: any) => {
      if (slot.useRecurring) {
        return slot.selectedDays.map((day: any) => ({
          dayOfWeek: day,
          amount: slot.amount,
          endTime: slot.endTime,
          duration: slot.duration,
          groundId: slot.groundId,
          startTime: slot.startTime,
          slotDate: getUpcomingDateByDay(day),
        }));
      } else {
        return slot.selectedDates.map((date: any) => ({
          slotDate: date,
          amount: slot.amount,
          endTime: slot.endTime,
          duration: slot.duration,
          groundId: slot.groundId,
          startTime: slot.startTime,
          dayOfWeek: getWeekDay(date).toLowerCase(),
        }));
      }
    });
  };

  const handleSaveSlots = async () => {
    if (!validateSlots()) {
      alert("Please fill in all required fields for each slot");
      return;
    }
    const apiData = prepareApiData();
    try {
      const response: any = await Post("/api/slot", { slots: apiData });
      if (response.success) {
        setSlots([{ ...initialSlot, id: Date.now() }]);
      } else throw new Error("Failed to create slots");
    } catch (error) {
      console.log("Error creating slots:", error);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const getNextDateForDay = (dayOfWeek: string): string => {
    const daysMap: Record<string, number> = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    const today = new Date();
    const todayDay = today.getDay();
    const targetDay = daysMap[dayOfWeek.toLowerCase()];

    let diff = targetDay - todayDay;
    if (diff <= 0) diff += 7;

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + diff);
    return formatDate(nextDate);
  };

  const getDayFromDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  };

  const duplicateSlot = (slotToDuplicate: Slot) => {
    setSlots([
      ...slots,
      {
        ...slotToDuplicate,
        id: Date.now(),
        selectedDates: [...slotToDuplicate.selectedDates],
        selectedDays: [...slotToDuplicate.selectedDays],
      },
    ]);
  };

  const removeSlot = (id: number) => {
    if (slots.length > 1) {
      setSlots(slots.filter((slot) => slot.id !== id));
    } else {
      setSlots([{ ...initialSlot, id: Date.now() }]);
    }
  };

  const generateDateRange = (startDate: string, endDate: string): string[] => {
    const dates: string[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      dates.push(formatDate(new Date(dt)));
    }
    return dates;
  };

  const handleDateRangeAdd = (
    slotId: number,
    startDate: string,
    endDate: string
  ) => {
    if (!startDate || !endDate) return;

    const dateRange = generateDateRange(startDate, endDate);
    setSlots(
      slots.map((slot) => {
        if (slot.id === slotId) {
          const existingDates = new Set(slot.selectedDates);
          const newDates = dateRange.filter((date) => !existingDates.has(date));
          const updatedDates = [...slot.selectedDates, ...newDates].sort();
          return { ...slot, selectedDates: updatedDates };
        }
        return slot;
      })
    );
  };

  return (
    <div className="bg-white p-4 rounded-2xl">
      <div className="w-full">
        <div className="flex w-full items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiCalendar className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900">
                Ground Slots Manager
              </h1>
              <p className="text-gray-600 text-xs">
                Create and manage doctor availability slots for multiple days
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 text-sm px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FiEye className="w-4 h-4" />
              <span>{showPreview ? "Add Slot" : "Show Slot"}</span>
            </button>
            <button
              onClick={addSlot}
              className="flex items-center space-x-2 text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add Slot</span>
            </button>
          </div>
        </div>

        {!showPreview && (
          <>
            {slots.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FiCalendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No slots added yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Click &apos;Add Slot&apos; to start creating doctor
                  availability slots
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {slots.map((slot, index) => (
                  <div
                    key={slot.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Slot #{index + 1}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => duplicateSlot(slot)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Duplicate Slot"
                        >
                          <FiCopy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeSlot(slot.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove Slot"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      {/* Doctor Selection */}
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                          <FiUser className="w-4 h-4" />
                          <span>Ground *</span>
                        </label>
                        <select
                          value={slot.groundId}
                          onChange={(e) =>
                            updateSlot(slot.id, "groundId", e.target.value)
                          }
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Ground</option>
                          {grounds.map((ground: any, index) => (
                            <option key={index} value={ground._id}>
                              {ground?.name?.en} - {ground.firstName}{" "}
                              {ground.lastName} ({ground.email})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Start Time */}
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                          <FiClock className="w-4 h-4" />
                          <span>Start Time *</span>
                        </label>
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) =>
                            handleStartTimeChange(slot.id, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Duration */}
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                          <FiClock className="w-4 h-4" />
                          <span>Duration *</span>
                        </label>
                        <select
                          value={slot.duration}
                          onChange={(e) =>
                            handleDurationChange(slot.id, e.target.value)
                          }
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value={15}>15 min</option>
                          <option value={30}>30 min</option>
                          <option value={45}>45 min</option>
                          <option value={60}>1 hour</option>
                          <option value={90}>1.5 hours</option>
                          <option value={120}>2 hours</option>
                          <option value={180}>3 hours</option>
                        </select>
                      </div>

                      {/* End Time (Auto-calculated) */}
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                          <FiClock className="w-4 h-4" />
                          <span>End Time</span>
                        </label>
                        <input
                          type="time"
                          value={slot.endTime}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                        />
                      </div>
                      {/* Amount Input */}
                      <div>
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                          <span>Amount (SAR) *</span>
                        </label>
                        <input
                          type="number"
                          value={slot.amount}
                          onChange={(e) =>
                            updateSlot(
                              slot.id,
                              "amount",
                              Number(e.target.value)
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>

                    {/* Schedule Type Toggle */}
                    <div className="mb-4">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <FiCalendar className="w-4 h-4" />
                        <span>Schedule Type *</span>
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`scheduleType_${slot.id}`}
                            checked={slot.useRecurring}
                            onChange={() =>
                              updateSlot(slot.id, "useRecurring", true)
                            }
                            className="mr-2"
                          />
                          Recurring Days
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`scheduleType_${slot.id}`}
                            checked={!slot.useRecurring}
                            onChange={() =>
                              updateSlot(slot.id, "useRecurring", false)
                            }
                            className="mr-2"
                          />
                          Specific Dates
                        </label>
                      </div>
                    </div>

                    {/* Recurring Days Selection */}
                    {slot.useRecurring && (
                      <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Select Days of Week *
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {daysOfWeek.map((day) => (
                            <label
                              key={day.value}
                              className="flex items-center space-x-2 p-2 border bg-white rounded-lg"
                            >
                              <input
                                type="checkbox"
                                checked={slot.selectedDays.includes(day.value)}
                                onChange={(e) =>
                                  handleDaySelection(
                                    slot.id,
                                    day.value,
                                    e.target.checked
                                  )
                                }
                                className="rounded"
                              />
                              <span className="text-sm">{day.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specific Dates Selection */}
                    {!slot.useRecurring && (
                      <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Select Specific Dates *
                        </label>

                        {/* Date Range Selector */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                          <input
                            type="date"
                            id={`startDate_${slot.id}`}
                            min={formatDate(new Date())}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Start Date"
                          />
                          <input
                            type="date"
                            id={`endDate_${slot.id}`}
                            min={formatDate(new Date())}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="End Date"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const startInput = document.getElementById(
                                `startDate_${slot.id}`
                              ) as HTMLInputElement;
                              const endInput = document.getElementById(
                                `endDate_${slot.id}`
                              ) as HTMLInputElement;
                              handleDateRangeAdd(
                                slot.id,
                                startInput.value,
                                endInput.value
                              );
                              startInput.value = "";
                              endInput.value = "";
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                          >
                            Add Range
                          </button>
                        </div>

                        {/* Single Date Selector */}
                        <div className="flex gap-2 mb-3">
                          <input
                            type="date"
                            id={`singleDate_${slot.id}`}
                            min={formatDate(new Date())}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const dateInput = document.getElementById(
                                `singleDate_${slot.id}`
                              ) as HTMLInputElement;
                              addDateToSlot(slot.id, dateInput.value);
                              dateInput.value = "";
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                          >
                            Add Date
                          </button>
                        </div>

                        {/* Selected Dates Display */}
                        {slot.selectedDates.length > 0 && (
                          <div className="border rounded-lg p-3 bg-white max-h-32 overflow-y-auto">
                            <div className="flex flex-wrap gap-1">
                              {slot.selectedDates.map((date) => (
                                <span
                                  key={date}
                                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded cursor-pointer hover:bg-blue-200"
                                  onClick={() =>
                                    handleDateSelection(slot.id, date)
                                  }
                                >
                                  {date}
                                  <button className="ml-1 text-blue-600 hover:text-blue-800">
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              {slot.selectedDates.length} date(s) selected •
                              Click to remove
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Summary */}
                    <div className="text-xs text-gray-600 bg-white p-2 rounded">
                      <strong>Summary:</strong> This will create{" "}
                      {slot.useRecurring
                        ? slot.selectedDays.length
                        : slot.selectedDates.length}{" "}
                      slot(s) for{" "}
                      {slot.useRecurring
                        ? `recurring ${slot.selectedDays
                          .map(
                            (day) =>
                              daysOfWeek.find((d) => d.value === day)?.label
                          )
                          .join(", ")}`
                        : `specific dates`}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {slots.length > 0 && (
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Total slots to create:{" "}
                  <strong>{prepareApiData().length}</strong>
                </div>
                <button
                  onClick={handleSaveSlots}
                  disabled={!validateSlots()}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <FiSave className="w-4 h-4" />
                  <span>Save All Slots</span>
                </button>
              </div>
            )}
          </>
        )}

        {showPreview && (
          <div className="w-full ">
            <div className="flex gap-2 justify-between">
              <div className="w-full">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <FiUser className="w-4 h-4" />
                  <span>Ground *</span>
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Ground</option>
                  {grounds.map((ground: any, index) => (
                    <option key={index} value={ground._id}>
                      {ground?.name?.en} - {ground.firstName} {ground.lastName} (
                      {ground.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <FiCalendar className="w-4 h-4" />
                  <span>Date *</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {selectedDate && (
                    <button
                      type="button"
                      onClick={() => setSelectedDate("")}
                      className="px-3 py-2.5 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
            <SlotBookingUI
              slots={previous}
              fetchGroundSlots={fetchGroundSlots}
              selectedDoctor={selectedDoctor}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSlotsManager;
