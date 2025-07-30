import {
  // MdCampaign,
  // MdOutlineMap,
  // MdManageAccounts,
  MdOutlineWorkOutline,
  MdOutlineSupportAgent,
} from "react-icons/md";
import {
  // RiKey2Line,
  RiAdminFill,
  RiVideoAddFill,
  RiFileUploadFill,
  RiSecurePaymentFill,
} from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
// import { GiEarthAsiaOceania } from "react-icons/gi";
// import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

export const tabs = [
  {
    id: 1,
    icon: FaHome,
    label: "Dashboard",
    href: "/dashboard",
    pageTitle: "Platform Overview",
    permission: "Dashboard",
    tabs: [],
  },
  {
    id: 2,
    icon: RiAdminFill,
    label: "Employee Management",
    permission: "Manage Users",
    href: "/dashboard/admins",
    pageTitle: "Manage Employees",
    tabs: [],
  },
  {
    id: 3,
    icon: MdOutlineWorkOutline,
    label: "User Directory",
    href: "/dashboard/users",
    pageTitle: "Manage Platform Users",
    permission: "Manage Users",
    tabs: [],
  },
  {
    id: 4,
    icon: RiVideoAddFill,
    label: "Ad Video Uploads",
    permission: "Manage Ads",
    href: "/dashboard/ad-videos",
    pageTitle: "Manage Ad Videos",
    tabs: [],
  },
  {
    id: 5,
    icon: RiFileUploadFill,
    label: "Bill Submissions",
    href: "/dashboard/bills",
    pageTitle: "User Bill Uploads",
    permission: "Manage Bills",
    tabs: [],
  },
  {
    id: 6,
    icon: RiSecurePaymentFill,
    label: "Point Redemption",
    href: "/dashboard/payments",
    pageTitle: "Transactions & Redemptions",
    permission: "Manage Payments",
    tabs: [],
  },
  {
    id: 7,
    icon: MdOutlineSupportAgent,
    label: "Support & Helpdesk",
    href: "/dashboard/support",
    pageTitle: "User Support Portal",
    permission: "Manage Support",
    tabs: [],
  },
  // {
  //   id: 8,
  //   icon: MdManageAccounts,
  //   label: "System Settings",
  //   href: "",
  //   pageTitle: "Administrative Tools",
  //   permission: "Access System Records",
  //   tabs: [
  //     {
  //       id: 801,
  //       icon: MdCampaign,
  //       label: "Banner Management",
  //       href: "/dashboard/banners",
  //       pageTitle: "Promotional Banners",
  //       permission: "Manage Banners",
  //     },
  //     {
  //       id: 802,
  //       icon: RiKey2Line,
  //       label: "OTP Logs",
  //       href: "/dashboard/otp-logs",
  //       pageTitle: "OTP History Logs",
  //       permission: "View OTP Logs",
  //     },
  //     {
  //       id: 803,
  //       icon: GiEarthAsiaOceania,
  //       label: "Country Directory",
  //       href: "/dashboard/countries",
  //       pageTitle: "Manage Countries",
  //       permission: "Manage Countries",
  //     },
  //     {
  //       id: 804,
  //       icon: MdOutlineMap,
  //       label: "State Directory",
  //       href: "/dashboard/states",
  //       pageTitle: "Manage States",
  //       permission: "Manage States",
  //     },
  //     {
  //       id: 805,
  //       icon: HiOutlineBuildingOffice2,
  //       label: "City Directory",
  //       href: "/dashboard/cities",
  //       pageTitle: "Manage Cities",
  //       permission: "Manage Cities",
  //     },
  //   ],
  // },
  {
    id: 9,
    icon: FiBell,
    label: "Notification Center",
    href: "/dashboard/notifications",
    pageTitle: "Manage Notifications",
    permission: "Manage Notifications",
    tabs: [],
  },
];

type TabItem = {
  id: number;
  icon: any;
  href: string;
  label: string;
  tabs?: TabItem[];
  pageTitle: string;
  permission: string;
};

export const flattenTabs = (tabList: TabItem[]): TabItem[] => {
  const flatList: TabItem[] = [];
  const formatPermission = (permission: string): string => {
    return permission
      .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
      .replace(/^./, (str) => str.toLowerCase()) // Convert first character to lowercase
      .trim() // Remove any leading/trailing spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };
  const recurse = (tabs: TabItem[], parent?: string) => {
    for (const tab of tabs) {
      const permission = formatPermission(tab?.permission);
      const { tabs: nested, ...rest } = tab;
      if (nested && nested.length > 0) recurse(nested, tab.label);
      else
        flatList.push({
          ...rest,
          permission: permission,
          ...(parent ? { parent } : {}),
        });
    }
  };
  recurse(tabList);
  return flatList;
};
