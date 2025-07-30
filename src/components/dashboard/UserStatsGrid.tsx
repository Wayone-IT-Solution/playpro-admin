import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatCompactNumber } from '@/hooks/general';
import { FaUsers, FaUserCheck, FaUserTimes, FaUserCog, FaChartLine } from "react-icons/fa";

const typeIcons: Record<string, any> = {
    worker: <FaUserCheck className="text-blue-500" size={24} />,
    employer: <FaUserCog className="text-green-500" size={24} />,
    contractor: <FaUserTimes className="text-orange-500" size={24} />,
    total: <FaUsers className="text-purple-600" size={24} />
};

// Sample data for demonstration
const sampleData = {
    stats: [
        { userType: 'worker', active: 1245, inactive: 89, total: 1334 },
        { userType: 'employer', active: 567, inactive: 23, total: 590 },
        { userType: 'contractor', active: 892, inactive: 45, total: 937 }
    ],
    grandTotal: { active: 2704, inactive: 157, total: 2861 }
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.95
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
        }
    }
};

const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
        scale: 1.1,
        rotate: 5,
        transition: { type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.95 }
};

const numberVariants = {
    initial: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { type: "spring", stiffness: 400 }
    }
};

const StatCard = ({ stat, isGrandTotal = false }: { stat: any, isGrandTotal?: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <motion.div
            variants={cardVariants}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative overflow-hidden bg-gradient-to-br bg-whiteBg rounded-2xl p-4 cursor-pointer group`}
        >
            {/* Glowing Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                initial={{ x: '-100%' }}
                animate={isHovered ? { x: '100%' } : { x: '-100%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <motion.div
                            variants={iconVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            className="p-2 bg-infobg backdrop-blur-sm rounded-xl"
                        >
                            <div className="text-white">
                                {isGrandTotal ? typeIcons.total : typeIcons[stat.userType]}
                            </div>
                        </motion.div>
                        <div>
                            <h3 className="text-base font-bold text-iconBlack capitalize">
                                {isGrandTotal ? 'All Users' : stat.userType}
                            </h3>
                            <motion.div
                                className="flex items-center gap-1 text-iconBlack text-xs"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <FaChartLine size={12} />
                                <span>Live Stats</span>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="space-y-2">
                    <motion.div
                        className="flex justify-between items-center px-2 py-1 bg-infobg rounded-lg"
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="text-iconBlack font-medium text-xs">Active:</span>
                        <motion.span
                            variants={numberVariants}
                            initial="initial"
                            whileHover="hover"
                            className="font-bold text-iconBlack text-base"
                        >
                            {formatCompactNumber(stat.active)}
                        </motion.span>
                    </motion.div>

                    <motion.div
                        className="flex justify-between items-center px-2 py-1 bg-infobg rounded-lg"
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="text-iconBlack font-medium text-xs">Inactive:</span>
                        <motion.span
                            variants={numberVariants}
                            initial="initial"
                            whileHover="hover"
                            className="font-bold text-iconBlack text-base"
                        >
                            {formatCompactNumber(stat.inactive)}
                        </motion.span>
                    </motion.div>

                    <motion.div
                        className="flex justify-between items-center px-2 py-1 bg-infobg rounded-lg border border-white/20"
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="text-iconBlack text-sm font-medium">Total:</span>
                        <motion.span
                            variants={numberVariants}
                            initial="initial"
                            whileHover="hover"
                            className="font-black text-iconBlack text-base"
                        >
                            {formatCompactNumber(stat.total)}
                        </motion.span>
                    </motion.div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="flex justify-between text-xs text-iconBlack mb-2">
                        <span>Activity Rate</span>
                        <span>{Math.round((stat.active / stat.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-infobg rounded-full h-2 overflow-hidden">
                        <motion.div
                            className="h-full bg-green-500 rounded-full" // adjust color as needed
                            initial={{ width: 0 }}
                            animate={{
                                width: stat.total > 0 ? `${(stat.active / stat.total) * 100}%` : "0%",
                            }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function UserStatsGrid({ statsData = sampleData }: { statsData?: any }) {
    return (
        <div className="bg-infobg">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3"
            >
                {statsData.stats.map((stat: any) => (
                    <StatCard key={stat.userType} stat={stat} />
                ))}

                {/* Grand Total Card - Spans full width on smaller screens */}
                <motion.div
                    variants={cardVariants}
                    className="lg:col-span-2 xl:col-span-1"
                >
                    <StatCard stat={statsData.grandTotal} isGrandTotal={true} />
                </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-3/4 right-1/3 w-1 h-1 bg-green-400 rounded-full opacity-40"
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 10, 0],
                        opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <motion.div
                    className="absolute top-1/2 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-30"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>
        </div>
    );
}