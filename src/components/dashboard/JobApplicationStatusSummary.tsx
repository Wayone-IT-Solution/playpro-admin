"use client";

import dayjs from "dayjs";
import useFetch from "@/hooks/useFetch";
import { Fetch } from "@/hooks/apiUtils";
import React, { useEffect, useState } from "react";
import DateFilter from "../common/table/DateFilter";
import {
    FaArrowUp,
    FaArrowDown,
    FaMinus,
    FaUserCheck,
    FaUserPlus,
    FaFileAlt,
    FaUserTimes,
    FaComments,
    FaSignOutAlt,
    FaUserTag,
    FaSearch,
    FaBan,
    FaCheck,
} from "react-icons/fa";

// Statuses to display
const statusLabels = [
    "applied",
    "rejected",
    "withdrawn",
    "under_review",
    "interview",
    "shortlisted",
    "hired",
    "offered",
    "offer_accepted",
    "offer_declined",
];

// Custom icon mapping
const statusIcons: Record<string, any> = {
    hired: <FaUserCheck />,
    applied: <FaUserPlus />,
    offered: <FaFileAlt />,
    rejected: <FaUserTimes />,
    interview: <FaComments />,
    withdrawn: <FaSignOutAlt />,
    shortlisted: <FaUserTag />,
    under_review: <FaSearch />,
    offer_declined: <FaBan />,
    offer_accepted: <FaCheck />,
};

// Status styling
const statusColors: any = {
    hired: {
        bg: "bg-gradient-to-bl from-blue-200 via-blue-100 to-blue-300",
        text: "text-blue-500",
    },
    applied: {
        bg: "bg-gradient-to-bl from-green-200 via-green-100 to-green-300",
        text: "text-green-500",
    },
    offered: {
        bg: "bg-gradient-to-bl from-yellow-200 via-yellow-100 to-yellow-300",
        text: "text-yellow-500",
    },
    rejected: {
        bg: "bg-gradient-to-bl from-red-200 via-red-100 to-red-300",
        text: "text-red-500",
    },
    interview: {
        bg: "bg-gradient-to-bl from-purple-200 via-purple-100 to-purple-300",
        text: "text-purple-500",
    },
    withdrawn: {
        bg: "bg-gradient-to-bl from-orange-200 via-orange-100 to-orange-300",
        text: "text-orange-500",
    },
    shortlisted: {
        bg: "bg-gradient-to-bl from-pink-200 via-pink-100 to-pink-300",
        text: "text-pink-500",
    },
    under_review: {
        bg: "bg-gradient-to-bl from-slate-200 via-slate-100 to-slate-300",
        text: "text-slate-500",
    },
    offer_declined: {
        bg: "bg-gradient-to-bl from-cyan-200 via-cyan-100 to-cyan-300",
        text: "text-cyan-500",
    },
    offer_accepted: {
        bg: "bg-gradient-to-bl from-indigo-200 via-indigo-100 to-indigo-300",
        text: "text-indigo-500",
    },
};

const JobApplicationStatusSummary = () => {
    const [startDate, setStartDate] = useState(
        dayjs().subtract(7, "day").format("YYYY-MM-DD")
    );
    const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
    const { data: dealsData } = useFetch("api/dashboard/job-applications");
    const crmStats: any = dealsData;
    const [data, setData] = useState(crmStats);

    useEffect(() => {
        if (crmStats) setData(crmStats);
    }, [crmStats]);

    const fetchData = async (filterParams: any) => {
        const params = {
            endDate: filterParams.end ?? endDate,
            startDate: filterParams.start ?? startDate,
        };
        try {
            const url = "api/dashboard/job-applications";
            const response: any = await Fetch(url, params, 5000, true, false);
            setData(response);
        } catch (error) {
            console.log("fetchSale error:", error);
        }
    };

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    const getChangeIcon = (value: number) => {
        if (value > 0) return <FaArrowUp className="w-4 h-4 text-green-600" />;
        if (value < 0) return <FaArrowDown className="w-4 h-4 text-red-600" />;
        return <FaMinus className="w-4 h-4 text-iconBlack" />;
    };

    const getChangeTextColor = (value: number) => {
        if (value > 0) return "text-green-600";
        if (value < 0) return "text-red-600";
        return "text-gray-500";
    };

    const formatLabel = (label: string) =>
        label.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    const totalApplications = statusLabels.reduce(
        (acc, key) => acc + (data?.[key] ?? 0),
        0
    );

    return (
        <div className="bg-whiteBg p-4 rounded-xl">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-iconBlack">
                        Job Application Status Summary
                    </h2>
                    <p className="text-xs text-gray-500">
                        From{" "}
                        <span className="font-medium">{formatDate(data?.from)}</span> to{" "}
                        <span className="font-medium">{formatDate(data?.to)}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Total Applications:{" "}
                        <span className="font-semibold text-iconBlack">
                            {totalApplications}
                        </span>
                    </p>
                </div>
                <DateFilter
                    endDate={endDate}
                    startDate={startDate}
                    setEndDate={setEndDate}
                    setStartDate={setStartDate}
                    fetchFilteredData={fetchData}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3">
                {statusLabels.map((status) => {
                    const count = data?.[status] ?? 0;
                    const change: number = data?.[`${status}_change`] ?? 0;
                    const color = statusColors?.[status];

                    return (
                        <div
                            key={status}
                            className={`p-3 bg-infobg rounded-xl shadow-sm transition hover:shadow-md`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <div className={`flex items-center gap-2 ${color.text}`}>
                                    {statusIcons[status]}
                                    <span className={`capitalize text-sm font-medium ${color.text}`}>
                                        {formatLabel(status)}
                                    </span>
                                </div>
                                {getChangeIcon(change)}
                            </div>
                            <div className={`text-xl my-2 font-bold ${color.text}`}>{count}</div>
                            <div
                                className={`text-xs mt-1 flex items-center gap-1 ${getChangeTextColor(
                                    change
                                )}`}
                            >
                                {change === 0
                                    ? "No change"
                                    : `${change > 0 ? "+" : ""}${change}%`}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default JobApplicationStatusSummary;
