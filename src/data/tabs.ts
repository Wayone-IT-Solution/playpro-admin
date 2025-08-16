import {
  MdArticle,
  MdCampaign,
  MdOutlineMap,
  MdLibraryBooks,
  MdManageAccounts,
  MdOutlineWorkOutline,
  MdOutlineSupportAgent,
  MdContactPhone, // 👈 Contact ke liye add kiya
} from "react-icons/md";
import {
  RiKey2Line,
  RiAdminFill,
  RiSecurePaymentFill,
  RiFileList2Line,
  RiErrorWarningLine,
  RiTimeLine,
  RiCurrencyFill,
  RiBankCardLine,
  RiCalendar2Line,
  RiCheckDoubleLine,
  RiCheckboxCircleLine,
  RiCalendarCheckLine,
} from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

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
    label: "User Access Management",
    href: "",
    pageTitle: "User Roles & Access",
    permission: "Manage Users",
    tabs: [
      {
        id: 203,
        icon: RiAdminFill,
        label: "Employees",
        href: "/dashboard/employees",
        pageTitle: "Manage Employees",
        permission: "Manage Employees",
      },
      {
        id: 201,
        icon: MdOutlineWorkOutline,
        label: "Users",
        href: "/dashboard/users",
        pageTitle: "Platform Users",
        permission: "Manage Users",
      },
      {
        id: 202,
        icon: HiOutlineBuildingOffice2,
        label: "Ground Owners",
        href: "/dashboard/property-owners",
        pageTitle: "Manage Property Owners",
        permission: "Manage Owners",
      },
    ],
  },
  {
    id: 3,
    icon: MdOutlineMap,
    label: "Ground Listings",
    href: "/dashboard/grounds",
    pageTitle: "Available Grounds",
    permission: "Manage Grounds",
    tabs: [],
  },
  {
    id: 5,
    icon: RiCalendarCheckLine,
    label: "Bookings",
    href: "",
    pageTitle: "Booking Management",
    permission: "Manage Bookings",
    tabs: [
      {
        id: 501,
        icon: RiFileList2Line,
        label: "All Bookings",
        href: "/dashboard/bookings",
        pageTitle: "All Bookings",
        permission: "View All Bookings",
      },
      {
        id: 502,
        icon: RiCheckboxCircleLine,
        label: "Confirmed",
        href: "/dashboard/bookings/confirmed",
        pageTitle: "Confirmed Bookings",
        permission: "View Confirmed Bookings",
      },
      {
        id: 503,
        icon: RiTimeLine,
        label: "Pending",
        href: "/dashboard/bookings/pending",
        pageTitle: "Pending Bookings",
        permission: "View Pending Bookings",
      },
      {
        id: 504,
        icon: RiCheckDoubleLine,
        label: "Completed",
        href: "/dashboard/bookings/completed",
        pageTitle: "Completed Bookings",
        permission: "View Completed Bookings",
      },
      {
        id: 505,
        icon: RiCalendar2Line,
        label: "Rescheduled",
        href: "/dashboard/bookings/rescheduled",
        pageTitle: "Rescheduled Bookings",
        permission: "View Pending Bookings",
      },
    ],
  },
  {
    id: 6,
    icon: RiBankCardLine,
    label: "Transactions",
    href: "",
    pageTitle: "Transactions",
    permission: "Transaction Management",
    tabs: [
      {
        id: 501,
        icon: RiFileList2Line,
        label: "All Transactions",
        href: "/dashboard/transactions",
        pageTitle: "All Transactions",
        permission: "View All Transactions",
      },
      {
        icon: RiCurrencyFill,
        id: 502,
        label: "Paid",
        href: "/dashboard/transactions/paid",
        pageTitle: "Confirmed Transactions",
        permission: "View Confirmed Transactions",
      },
      {
        icon: RiTimeLine,
        id: 503,
        label: "Pending",
        href: "/dashboard/transactions/pending",
        pageTitle: "Pending Transactions",
        permission: "View Pending Transactions",
      },
      {
        id: 504,
        icon: RiErrorWarningLine,
        label: "Failed",
        href: "/dashboard/transactions/failed",
        pageTitle: "Failed Transactions",
        permission: "View Completed Transactions",
      },
    ],
  },
  {
    id: 7,
    icon: MdLibraryBooks,
    label: "Blog Management",
    href: "",
    pageTitle: "Content Management Tools",
    permission: "Access Blog Records",
    tabs: [
      {
        id: 601,
        icon: MdArticle,
        label: "All Blogs",
        href: "/dashboard/blogs",
        pageTitle: "Manage Blogs",
        permission: "Manage Blogs",
      },
      {
        id: 602,
        icon: BiCategory,
        label: "Blog Categories",
        href: "/dashboard/blog-categories",
        pageTitle: "Manage Blog Categories",
        permission: "Manage Blog Categories",
      },
    ],
  },
  {
    id: 8,
    icon: MdOutlineSupportAgent,
    label: "Testimonials",
    href: "/dashboard/testimonials",
    pageTitle: "User Testimonials",
    permission: "Manage Testimonials",
    tabs: [],
  },
  {
    id: 9,
    icon: RiSecurePaymentFill,
    label: "Review & Ratings",
    href: "/dashboard/reviews",
    pageTitle: "Review and Rating System",
    permission: "Manage Reviews",
    tabs: [],
  },
  {
    id: 10,
    icon: MdManageAccounts,
    label: "System Settings",
    href: "",
    pageTitle: "Administrative Tools",
    permission: "Access System Records",
    tabs: [
      {
        id: 901,
        icon: MdCampaign,
        label: "Banner Management",
        href: "/dashboard/banners",
        pageTitle: "Promotional Banners",
        permission: "Manage Banners",
      },
      {
        id: 902,
        icon: RiKey2Line,
        label: "OTP Logs",
        href: "/dashboard/otp-logs",
        pageTitle: "OTP History Logs",
        permission: "View OTP Logs",
      },
      {
        id: 903,
        icon: GiEarthAsiaOceania,
        label: "Country Directory",
        href: "/dashboard/countries",
        pageTitle: "Manage Countries",
        permission: "Manage Countries",
      },
      {
        id: 904,
        icon: MdOutlineMap,
        label: "State Directory",
        href: "/dashboard/states",
        pageTitle: "Manage States",
        permission: "Manage States",
      },
      {
        id: 905,
        icon: HiOutlineBuildingOffice2,
        label: "City Directory",
        href: "/dashboard/cities",
        pageTitle: "Manage Cities",
        permission: "Manage Cities",
      },
    ],
  },
  // 👇 New Contact Us tab
  {
    id: 11,
    icon: MdContactPhone,
    label: "Contact Us",
    href: "/dashboard/contact-us",
    pageTitle: "Contact Messages",
    permission: "Manage Contact",
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
