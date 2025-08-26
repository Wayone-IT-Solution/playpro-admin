"use client";

import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { Fetch } from "@/hooks/apiUtils";
import { IoStatsChart } from "react-icons/io5";
import DateFilter from "../common/table/DateFilter";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { FC, useCallback, useEffect, useState } from "react";
import { formatCompactNumber, formatIndianCurrency } from "@/hooks/general";

const LineGraph = dynamic(() => import("@/components/chart/Linegraph"), {
  ssr: false, // 🚫 Disable Server Side Rendering for this component
});
const BarChartWithNegativePositiveXAxis = dynamic(
  () => import("@/components/chart/BarChartWithNegativePositiveXAxis"),
  {
    ssr: false, // 🚫 Disable Server Side Rendering for this component
  }
);

import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

const Home: FC = () => {
  const currentYear = new Date().getFullYear();
  const [dateRangeMessage, setDateRangeMessage] = useState<string>("");
  const [startDate, setStartDate] = useState(
    dayjs().subtract(8, "day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));

  const [data, setData] = useState<any>({});
  const [yearData, setYearlyData] = useState<any>({});
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const diff = end.diff(start, "day");

    const isEndToday = end.isToday();
    const formattedEnd = end.format("MMM D, YYYY");
    const formattedStart = start.format("MMM D, YYYY");

    let message = "";

    if (isEndToday) {
      if (diff === 7)
        message = `last 7 days (${formattedStart} - ${formattedEnd})`;
      else message = `last ${diff} days (${formattedStart} - ${formattedEnd})`;
    } else
      message = `date range ${formattedStart} - ${formattedEnd} (${diff} days)`;

    setDateRangeMessage(message);
  }, [startDate, endDate]);

  const fetchData = useCallback(
    async (filterParams: any) => {
      const params = {
        endDate: filterParams.end ?? endDate,
        startDate: filterParams.start ?? startDate,
      };
      try {
        const response: any = await Fetch(
          "/api/revenue/stats",
          params,
          5000,
          true,
          false
        );
        if (response?.success) setData(response?.data);
      } catch (error) {
        console.log("fetchSale error:", error);
      }
    },
    [startDate, endDate]
  );

  useEffect(() => {
    fetchData({});
  }, [fetchData]);

  const fetchYearlyData = useCallback(async () => {
    const params = { year: selectedYear };
    try {
      const response: any = await Fetch(
        "/api/revenue",
        params,
        5000,
        true,
        false
      );
      if (response?.success) setYearlyData(response?.data);
    } catch (error) {
      console.log("fetchSale error:", error);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchYearlyData();
  }, [fetchYearlyData]);

  const renderIcon = (value: any) => {
    return value > 0 ? (
      <FaArrowUp className="text-green-500" />
    ) : (
      <FaArrowDown className="text-red-500" />
    );
  };

  return (
    <div className="space-y-10">
      {/* CRM Stats */}
      <section className="">
        <div className="flex justify-between items-center">
          <h2 className="text-base leading-5 font-semibold text-iconBlack">
            Customer Insights Dashboard <br />
            <span className="text-xs italic font-normal text-iconBlack">
              - Displaying insights for {dateRangeMessage}
            </span>
          </h2>
          <DateFilter
            endDate={endDate}
            startDate={startDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            fetchFilteredData={fetchData}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3 md:grid-cols-4">
          <div title="Total revenue generated from all active listings"
            className="p-2 flex flex-col gap-2 cursor-pointer bg-whiteBg rounded-xl">
            {/* Title */}
            <h2 className="text-sm font-bold text-gray-700">Revenue Overview</h2>

            <div className="flex gap-2">
              {/* Left Side (Stats + Graph) */}
              <div className="w-[55%]">
                <p className="text-sm inline-flex items-center text-iconBlack font-bold">
                  {data && data["revenue"]?.percentageChange}%{" "}
                  {renderIcon(data["revenue"]?.percentageChange)}
                </p>
                <h3 className="text-[10px] font-semibold text-iconBlack">
                  from last period (
                  {formatIndianCurrency(data["revenue"]?.totalPrevious)})
                </h3>
                {data && data?.["revenue"] && (
                  <LineGraph
                    data={data["revenue"]?.chartData}
                    borderColor="rgba(0, 123, 255, 1)"
                  />
                )}
              </div>

              {/* Right Side (Icon + Total) */}
              <div className="w-[45%] flex flex-col justify-end items-end text-right gap-3">
                <div className="bg-blue-200 p-1.5 w-fit rounded-full">
                  <div className="bg-blue-500 w-fit p-1.5 rounded-full">
                    <IoStatsChart className="text-white text-base" />
                  </div>
                </div>
                <div>
                  <p className="text-base font-bold text-iconBlack">
                    {formatIndianCurrency(data["revenue"]?.totalCurrent)}
                  </p>
                  <h3 className="text-[10px] text-gray-500 font-semibold">
                    Total Redeemed
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div
            title="Number of users currently active and engaging with the platform"
            className="p-2 flex flex-col gap-2 cursor-pointer bg-whiteBg rounded-xl">
            {/* Title */}
            <h2 className="text-sm font-bold text-gray-700">Active Users Overview</h2>

            <div className="flex gap-2">
              {/* Left Side (Stats + Graph) */}
              <div className="w-[55%]">
                <p className="text-sm inline-flex items-center text-iconBlack font-bold">
                  {data && data["activeUsers"]?.percentageChange}%{" "}
                  {renderIcon(data["activeUsers"]?.percentageChange)}
                </p>
                <h3 className="text-[10px] font-semibold text-iconBlack">
                  from last period ({data["activeUsers"]?.totalPrevious})
                </h3>
                {data && data?.["activeUsers"] && (
                  <LineGraph
                    data={data["activeUsers"]?.chartData}
                    borderColor="rgba(255, 165, 0, 1)"
                  />
                )}
              </div>

              {/* Right Side (Icon + Total) */}
              <div className="w-[45%] flex flex-col justify-end items-end text-right gap-3">
                <div className="bg-orange-200 p-1.5 w-fit rounded-full">
                  <div className="bg-orange-500 w-fit p-1.5 rounded-full">
                    <IoStatsChart className="text-white text-base" />
                  </div>
                </div>
                <div>
                  <p className="text-base font-bold text-iconBlack">
                    {formatCompactNumber(data["activeUsers"]?.totalCurrent)}
                  </p>
                  <h3 className="text-[10px] text-gray-500 font-semibold">
                    User Activity Overview
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 flex flex-col gap-2 bg-whiteBg rounded-xl">
            {/* 🔹 Descriptive Title */}
            <h2 className="text-sm font-bold text-gray-700">Ground Owners Overview</h2>

            <div className="flex gap-2">
              {/* Left Side (Stats + Graph) */}
              <div className="w-[55%]">
                <p className="text-sm inline-flex items-center text-iconBlack font-bold">
                  {data && data["activeGroundOwners"]?.percentageChange}%{" "}
                  {renderIcon(data["activeGroundOwners"]?.percentageChange)}
                </p>
                <h3 className="text-[10px] font-semibold text-iconBlack">
                  from last period ({data["activeGroundOwners"]?.totalPrevious})
                </h3>
                {data && data?.["activeGroundOwners"] && (
                  <LineGraph
                    data={data["activeGroundOwners"]?.chartData}
                    borderColor="rgba(255, 0, 0, 1)"
                  />
                )}
              </div>

              {/* Right Side (Icon + Total) */}
              <div className="w-[45%] flex flex-col justify-end items-end text-right gap-3">
                <div className="bg-red-200 p-1.5 w-fit rounded-full">
                  <div className="bg-red-500 w-fit p-1.5 rounded-full">
                    <IoStatsChart className="text-white text-base" />
                  </div>
                </div>
                <div>
                  <p className="text-base font-bold text-iconBlack">
                    {formatCompactNumber(data["activeGroundOwners"]?.totalCurrent)}
                  </p>
                  <h3 className="text-[10px] text-gray-500 font-semibold">
                    Ground Owners Registered
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 flex flex-col gap-2 bg-whiteBg rounded-xl">
            {/* 🔹 Descriptive Title */}
            <h2 className="text-sm font-bold text-gray-700">Active Grounds Overview</h2>

            <div className="flex gap-2">
              {/* Left Side (Stats + Graph) */}
              <div className="w-[55%]">
                <p className="text-sm inline-flex items-center text-iconBlack font-bold">
                  {data && data["activeGrounds"]?.percentageChange}%
                  {renderIcon(data["activeGrounds"]?.percentageChange)}
                </p>
                <h3 className="text-[10px] font-semibold text-iconBlack">
                  from last period ({data["activeGrounds"]?.totalPrevious})
                </h3>
                {data && data?.["activeGrounds"] && (
                  <LineGraph
                    data={data["activeGrounds"]?.chartData}
                    borderColor="rgba(128, 128, 128, 1)"
                  />
                )}
              </div>

              {/* Right Side (Icon + Total) */}
              <div className="w-[45%] flex flex-col justify-end items-end text-right gap-3">
                <div className="bg-purple-200 p-1.5 w-fit rounded-full">
                  <div className="bg-purple-500 w-fit p-1.5 rounded-full">
                    <IoStatsChart className="text-white text-base" />
                  </div>
                </div>
                <div>
                  <p className="text-base font-bold text-iconBlack">
                    {formatCompactNumber(data["activeGrounds"]?.totalCurrent)}
                  </p>
                  <h3 className="text-[10px] text-gray-500 font-semibold">
                    Total Active Grounds
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-3 gap-3 rounded-xl">
          <div className="col-span-3">
            {/* Revenue Chart (example) */}
            <div className="bg-whiteBg p-4 rounded-xl h-full">
              <div className="flex items-center justify-between pb-4">
                <h3 className="text-base text-iconBlack font-semibold">
                  Redeem Statistics
                </h3>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="border border-iconBlack rounded-md px-3 py-1 text-xs text-iconBlack bg-infobg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = currentYear - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="bg-infobg p-4 rounded-xl">
                <div className="grid grid-cols-3 justify-center items-center">
                  <div className="text-center text-xs text-iconBlack font-semibold">
                    Current Revenue
                    <br />
                    <span className="text-base font-extrabold text-iconBlack">
                      {formatIndianCurrency(yearData?.totalCurrent)}
                    </span>
                  </div>
                  <div className="text-center text-xs text-iconBlack font-semibold">
                    Previous Revenue
                    <br />
                    <span className="text-base font-extrabold text-iconBlack">
                      {yearData?.totalPrevious ? formatIndianCurrency(yearData?.totalPrevious) : "No Data available for comparison"}
                    </span>
                  </div>
                  <div className="text-center text-xs text-iconBlack font-semibold">
                    Change (%)
                    <br />
                    <span className="text-base font-extrabold text-iconBlack">
                      {yearData?.percentageChange}%
                    </span>
                  </div>
                </div>
              </div>
              <BarChartWithNegativePositiveXAxis data={yearData} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
