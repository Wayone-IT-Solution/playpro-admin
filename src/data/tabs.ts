import {
  MdArticle,
  MdCampaign,
  MdOutlineMap,
  MdContactPhone,
  MdLibraryBooks,
  MdManageAccounts,
  MdOutlineWorkOutline,
  MdOutlineSupportAgent,
} from "react-icons/md";
import {
  RiKey2Line,
  RiTimeLine,
  RiAdminFill,
  RiCurrencyFill,
  RiBankCardLine,
  RiFileList2Line,
  RiCalendarCheckLine,
  RiSecurePaymentFill,
  RiShoppingCart2Line,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { GoTasklist } from "react-icons/go";
import { TbBrandBebo } from "react-icons/tb";
import { FaTags, FaHandshake } from "react-icons/fa";
import { FaHome, FaProductHunt } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BiCategory, BiSolidCategory } from "react-icons/bi";
import { GiEarthAsiaOceania, GiWhistle } from "react-icons/gi";

export const tabs = [
  {
    id: 1,
    tabs: [],
    icon: FaHome,
    label: "Dashboard Overview",
    href: "/dashboard",
    permission: "Dashboard",
    pageTitle: "Platform Overview",
  },
  {
    id: 2,
    icon: RiAdminFill,
    label: "User & Role Management",
    href: "",
    pageTitle: "Manage Users & Roles",
    permission: "Manage Users",
    tabs: [
      {
        id: 201,
        icon: MdOutlineWorkOutline,
        label: "User Directory",
        pageTitle: "All Users",
        href: "/dashboard/users",
        permission: "Manage Users",
      },
      {
        id: 202,
        icon: HiOutlineBuildingOffice2,
        label: "Property & Ground Owners",
        href: "/dashboard/property-owners",
        pageTitle: "Ground Owners",
        permission: "Manage Owners",
      },
      {
        id: 203,
        icon: RiAdminFill,
        label: "Employee Directory",
        href: "/dashboard/employees",
        pageTitle: "Employees",
        permission: "Manage Employees",
      },
      {
        id: 204,
        icon: MdManageAccounts,
        label: "Roles & Access Control",
        href: "/dashboard/role-management",
        pageTitle: "Access Control",
        permission: "roleManagement",
      },
    ],
  },
  {
    id: 3,
    icon: MdOutlineMap,
    label: "Ground Listings",
    href: "/dashboard/grounds",
    pageTitle: "Ground Listings",
    permission: "Manage Grounds",
    tabs: [],
  },
  {
    id: 21,
    icon: RiAdminFill,
    label: "Academy Management",
    href: "",
    pageTitle: "Manage Academy",
    permission: "Manage Users",
    tabs: [
      {
        id: 201,
        icon: MdOutlineWorkOutline,
        label: "Academy Directory",
        pageTitle: "All Academy",
        href: "/dashboard/academy",
        permission: "Manage Academy",
      },
      // {
      //   id: 202,
      //   icon: HiOutlineBuildingOffice2,
      //   label: "Coaches and Trainings",
      //   href: "/dashboard/coaches-trainings",
      //   pageTitle: "All Coaches and Trainings Slots",
      //   permission: "Manage Owners",
      // },
      {
        id: 203,
        icon: RiAdminFill,
        label: "Application Directory",
        href: "/dashboard/application",
        pageTitle: "Manage Application",
        permission: "Manage Application",
      },
      {
        id: 205,
        icon: GiWhistle,
        label: "Coach Directory",
        href: "/dashboard/coaches",
        pageTitle: "Coach Management",
        permission: "Manage Coaches",
      },
      {
        id: 204,
        icon: MdManageAccounts,
        label: "Players & Attendance",
        href: "/dashboard/registration-requests",
        pageTitle: "All Players & Attendance",
        permission: "Manage Players",
      },
    ],
  },
  {
    id: 4,
    icon: GoTasklist,
    label: "Slot Scheduling",
    href: "/dashboard/tasks",
    pageTitle: "Ground Slot Scheduling",
    permission: "Manage Slots",
    tabs: [],
  },
  {
    id: 5,
    icon: RiCalendarCheckLine,
    label: "Booking Management",
    href: "",
    pageTitle: "Booking Management",
    permission: "Manage Bookings",
    tabs: [
      {
        id: 501,
        icon: RiFileList2Line,
        label: "All Reservations",
        href: "/dashboard/bookings",
        pageTitle: "Bookings Overview",
        permission: "View All Bookings",
      },
      {
        id: 502,
        icon: RiCheckboxCircleLine,
        label: "Confirmed Reservations",
        href: "/dashboard/bookings/confirmed",
        pageTitle: "Confirmed Bookings",
        permission: "View Confirmed Bookings",
      },
      {
        id: 503,
        icon: RiTimeLine,
        label: "Pending Reservations",
        href: "/dashboard/bookings/pending",
        pageTitle: "Pending Bookings",
        permission: "View Pending Bookings",
      },
    ],
  },
  {
    id: 6,
    icon: RiBankCardLine,
    label: "Financial Transactions",
    href: "",
    pageTitle: "Transaction Records",
    permission: "Transaction Management",
    tabs: [
      {
        id: 601,
        icon: RiFileList2Line,
        label: "All Transactions",
        href: "/dashboard/transactions",
        pageTitle: "All Transactions",
        permission: "View All Transactions",
      },
      {
        id: 602,
        icon: RiCurrencyFill,
        label: "Completed Payments",
        href: "/dashboard/transactions/paid",
        pageTitle: "Paid Transactions",
        permission: "View Paid Transactions",
      },
      {
        id: 603,
        icon: RiTimeLine,
        label: "Pending Payments",
        href: "/dashboard/transactions/pending",
        pageTitle: "Pending Transactions",
        permission: "View Pending Transactions",
      },
    ],
  },
  {
    id: 7,
    icon: FaProductHunt,
    label: "Product Catalog",
    href: "",
    pageTitle: "Product Management",
    permission: "Manage Products",
    tabs: [
      {
        id: 701,
        icon: BiSolidCategory,
        label: "Product Categories",
        href: "/dashboard/categories",
        pageTitle: "Product Categories",
        permission: "Manage Categories",
      },
      {
        id: 702,
        icon: FaProductHunt,
        label: "All Products",
        href: "/dashboard/product",
        pageTitle: "Manage Products",
        permission: "Manage Products",
      },
      {
        id: 703,
        icon: TbBrandBebo,
        label: "Product Brands",
        href: "/dashboard/brand",
        pageTitle: "Product Brands",
        permission: "Manage Brands",
      },
    ],
  },
  {
    id: 8,
    icon: RiShoppingCart2Line,
    label: "Orders & Shopping Carts",
    href: "",
    pageTitle: "Sales Management",
    permission: "Manage Orders",
    tabs: [
      {
        id: 801,
        icon: RiFileList2Line,
        label: "Customer Orders",
        href: "/dashboard/orders",
        pageTitle: "Customer Orders",
        permission: "Manage Orders",
      },
      {
        id: 802,
        icon: RiShoppingCart2Line,
        label: "Customer Carts",
        href: "/dashboard/carts",
        pageTitle: "User Carts",
        permission: "Manage Carts",
      },
    ],
  },
  {
    id: 9,
    icon: MdLibraryBooks,
    label: "Content & Blogs",
    href: "",
    pageTitle: "Content Management",
    permission: "Manage Content",
    tabs: [
      {
        id: 901,
        icon: MdArticle,
        label: "Blog Articles",
        href: "/dashboard/blogs",
        pageTitle: "Manage Blogs",
        permission: "Manage Blogs",
      },
      {
        id: 902,
        icon: BiCategory,
        label: "Blog Categories",
        href: "/dashboard/blog-categories",
        pageTitle: "Manage Blog Categories",
        permission: "Manage Blog Categories",
      },
    ],
  },
  {
    id: 11,
    icon: MdManageAccounts,
    label: "System Configuration",
    href: "",
    pageTitle: "Admin Tools",
    permission: "Access Settings",
    tabs: [
      {
        id: 1101,
        icon: MdCampaign,
        label: "Banner Management",
        href: "/dashboard/banners",
        pageTitle: "Banner Management",
        permission: "Manage Banners",
      },
      {
        id: 13,
        icon: FaTags,
        label: "Coupon Management",
        href: "/dashboard/coupons",
        pageTitle: "Coupon Management",
        permission: "Manage Coupons",
        tabs: [],
      },
      {
        id: 902,
        icon: FaHandshake,
        label: "Sponsorships",
        href: "/dashboard/sponsor",
        pageTitle: "Sponsor Management",
        permission: "manageSponsors",
      },
      {
        id: 903,
        icon: MdOutlineSupportAgent,
        label: "User Testimonials",
        href: "/dashboard/testimonials",
        pageTitle: "User Testimonials",
        permission: "Manage Testimonials",
      },
      {
        id: 10,
        icon: RiSecurePaymentFill,
        label: "Customer Reviews",
        href: "/dashboard/reviews",
        pageTitle: "Customer Feedback",
        permission: "Manage Reviews",
        tabs: [],
      },
      {
        id: 1102,
        icon: RiKey2Line,
        label: "OTP & Security Logs",
        href: "/dashboard/otp-logs",
        pageTitle: "OTP Logs",
        permission: "View OTP Logs",
      },
      {
        id: 1103,
        icon: GiEarthAsiaOceania,
        label: "Country Directory",
        href: "/dashboard/countries",
        pageTitle: "Country Management",
        permission: "Manage Countries",
      },
      {
        id: 1104,
        icon: MdOutlineMap,
        label: "State Directory",
        href: "/dashboard/states",
        pageTitle: "State Management",
        permission: "Manage States",
      },
      {
        id: 1105,
        icon: HiOutlineBuildingOffice2,
        label: "City Directory",
        href: "/dashboard/cities",
        pageTitle: "City Management",
        permission: "Manage Cities",
      },
    ],
  },
  {
    id: 12,
    icon: MdContactPhone,
    label: "Contact Submissions",
    href: "/dashboard/contact-us",
    pageTitle: "Contact Submissions",
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
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toLowerCase())
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const recurse = (tabs: TabItem[], parent?: string) => {
    for (const tab of tabs) {
      const permission = formatPermission(tab?.permission);
      const { tabs: nested, ...rest } = tab;

      if (nested && nested.length > 0) recurse(nested, tab.label);
      else {
        flatList.push({
          ...rest,
          permission: permission,
          ...(parent ? { parent } : {}),
        });
      }
    }
  };

  recurse(tabList);
  return flatList;
};

export const combineParentTabs = (tabList: TabItem[]): TabItem[] => {
  const combinedList: TabItem[] = [];

  tabList.forEach((tab: any) => {
    if (tab.parent) {
      let parentTab = combinedList.find((item) => item.label === tab.parent);

      if (!parentTab) {
        parentTab = {
          href: "",
          tabs: [],
          id: Date.now(),
          icon: tab.icon,
          label: tab.parent,
          permission: tab.parent,
          pageTitle: `${tab.parent} Overview`,
        };
        combinedList.push(parentTab);
      }
      parentTab.tabs?.push({
        id: tab.id,
        label: tab.label,
        href: tab.href,
        pageTitle: tab.pageTitle,
        permission: tab.permission,
        icon: tab.icon || FaTags, // Default icon if not present
      });
    } else {
      combinedList.push({
        id: tab.id,
        label: tab.label,
        href: tab.href,
        pageTitle: tab.pageTitle,
        permission: tab.permission,
        icon: tab.icon || FaTags, // Default icon if not present
      });
    }
  });

  return combinedList;
};
