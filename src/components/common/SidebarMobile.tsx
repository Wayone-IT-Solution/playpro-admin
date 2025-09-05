"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import {
  RiCloseLine,
  RiMenuFoldLine,
  RiArrowDropDownLine,
} from "react-icons/ri";
import Image from "next/image";

const SidebarMobile = ({ filteredTabs }: { filteredTabs: any }) => {
  const pathname = usePathname();
  const { token, isDarkMode } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [list, showList] = useState<any>({ tab: "", list: [] });
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
        showList({ tab: "", list: [] });
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!token) return null;
  return (
    <div className="lg:hidden fixed z-[100] w-[10%] md:w-[7%] h-full">
      {/* Icon sidebar */}
      <div className="flex flex-col bg-primary h-full text-white items-center py-4 gap-6">
        {filteredTabs.map((tab: any, index: number) => {
          const Icon = tab.icon;
          return (
            <button
              key={index}
              onClick={() => setIsOpen(true)}
              title={tab.label}
              className="text-white hover:text-secondary"
            >
              <Icon size={20} />
            </button>
          );
        })}

        <button
          onClick={() => setIsOpen(true)}
          className="text-white mt-auto text-xs"
        >
          <RiMenuFoldLine size={22} />
        </button>
      </div>

      {/* Full sidebar overlay */}
      {isOpen && (
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 h-full w-64 bg-primary text-white z-50 shadow-lg overflow-y-auto transition-all duration-300"
        >
          <div className="flex justify-between items-center px-4 py-3 border-b border-secondary">
            <Image
              priority
              alt="Icon"
              width={200}
              unoptimized
              height={100}
              src={
                isDarkMode ? "/assets/logo/logo.png" : "/assets/logo/logo2.png"
              }
              className={`mx-auto object-contain w-32 py-0.5`}
            />
            <button onClick={() => setIsOpen(false)}>
              <RiCloseLine size={22} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-4">
            {filteredTabs.map((tab: any, index: number) => {
              const Icon = tab.icon;
              return (
                <div key={index}>
                  <Link
                    href={tab?.href}
                    aria-label={tab?.label}
                    onClick={() => {
                      if (
                        list?.list.length > 0 &&
                        list?.tab === tab?.permission
                      )
                        return showList({ tab: "", list: [] });
                      if (tab?.tabs && tab?.tabs.length > 0)
                        showList({ tab: tab?.permission, list: tab?.tabs });
                    }}
                    className={`py-2.5 pl-2 mr-auto w-[90%] mx-auto rounded-xl text-xs pr-2 cursor-pointer transition flex justify-between gap-2 items-center border-primary hover:bg-white hover:text-primary ${pathname === tab?.href
                      ? "bg-white text-primary font-semibold"
                      : "text-white"
                      }`}
                  >
                    <span className="flex gap-2 text-xs items-center">
                      <Icon size={16} /> {tab?.label}
                    </span>
                    {tab?.tabs && tab?.tabs.length > 0 && (
                      <RiArrowDropDownLine size={23} className="w-fit" />
                    )}
                  </Link>
                  {list.tab === tab.permission &&
                    list.list.map((child: any, idx: number) => {
                      const ChildIcon = child.icon;
                      return (
                        <Link
                          key={idx}
                          href={child.href}
                          className="pl-8 py-1.5 text-xs flex items-center gap-2 hover:text-white text-info"
                        >
                          <ChildIcon size={12} />
                          {child.label}
                        </Link>
                      );
                    })}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

export default SidebarMobile;
