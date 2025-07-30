"use client";

import { Fetch } from "@/hooks/apiUtils";
import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import Wrapper from "@/components/common/Wrapper";
import { AnimatePresence, motion } from "framer-motion";
import {
  MdReceipt,
  MdVerified,
  MdHourglassTop,
  MdOndemandVideo,
  MdNotificationsActive,
} from "react-icons/md";
import dayjs from "dayjs";
import Pagination from "@/components/common/table/Pagination";

const iconMap: Record<string, any> = {
  "bill-uploaded": <MdReceipt className="text-indigo-500 w-5 h-5" />,
  "all-videos-completed": <MdOndemandVideo className="text-blue-500 w-5 h-5" />,
  "withdrawal-requested": (
    <MdHourglassTop className="text-yellow-500 w-5 h-5" />
  ),
  "transaction-approved": <MdVerified className="text-green-500 w-5 h-5" />,
};

export default function NotificationPanel() {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [paginate, setPaginate] = useState<any>({
    totalPages: 1,
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 10,
  });

  const fetchNotifications = async (params: any = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: params.page ?? "1",
        limit: params.limit ?? "10",
      }).toString();
      const url = `/api/notifications?${queryParams}`;
      const response: any = await Fetch(url, {}, 5000, true);
      if (response?.success) {
        setNotifications(response.data?.result || []);
        setPaginate(response.data?.pagination);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications({});
  }, []);

  const getIcon = (type: string) =>
    iconMap[type] || (
      <MdNotificationsActive className="text-gray-400 w-5 h-5" />
    );

  return (
    <AuthGuard>
      <Wrapper>
        <div className="bg-whiteBg rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-iconBlack">
                Notifications{" "}
                <span className="text-sm text-iconBlack">
                  ({paginate.totalItems})
                </span>
              </h2>
            </div>
          </div>
          {/* Notifications List */}
          <div className="space-y-2">
            {loading ? (
              <div className="text-center text-gray-400 text-sm">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center text-gray-500 text-sm">
                No notifications found.
              </div>
            ) : (
              <AnimatePresence>
                {notifications.map((noti, index) => (
                  <motion.div
                    key={noti._id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-start bg-infobg rounded-lg p-3"
                  >
                    <div className="mr-3 mt-1">{getIcon(noti.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-iconBlack">
                          {noti.title}
                        </p>
                        <time className="text-xs text-iconBlack">
                          {dayjs(noti.createdAt).format("MMM D, YYYY - h:mm A")}
                        </time>
                      </div>
                      <p className="text-sm text-iconBlack">{noti.message}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Pagination */}
          {notifications.length > 0 && (
            <div className="mt-4">
              <Pagination
                paginate={paginate}
                fetchFilteredData={fetchNotifications}
              />
            </div>
          )}
        </div>
      </Wrapper>
    </AuthGuard>
  );
}
