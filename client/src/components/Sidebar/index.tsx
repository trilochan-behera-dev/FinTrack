import Link from "next/link";
import CrossSvg from "../Svg/CrossSvg";
import CalenderSvg from "../Svg/CalenderSvg";
import DashboardSvg from "../Svg/DashboardSvg";
import ExpenseSideSvg from "../Svg/ExpenseSideSvg";
import IncomeSideSvg from "../Svg/IncomeSideSvg";
import IncomeSvg from "../Svg/IncomeSvg";
import ProfileSvg from "../Svg/ProfileSvg";
import SavingSideSvg from "../Svg/SavingSideSvg";
import SettingSvg from "../Svg/SettingSvg";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const SidebarOptions = [
    {
      name: 'Dashboard',
      link: "/",
      icon: DashboardSvg
    },
    {
      name: 'Expense',
      link: "/expense",
      icon: ExpenseSideSvg
    },
    {
      name: 'Savings',
      link: "/savings",
      icon: SavingSideSvg
    },
    {
      name: 'Income',
      link: "/income",
      icon: IncomeSideSvg
    },
    {
      name: 'Profile',
      link: "/profile",
      icon: ProfileSvg
    },
    {
      name: 'Calendar',
      link: "/calendar",
      icon: CalenderSvg
    },
    {
      name: 'Settings',
      link: "/settings",
      icon: SettingSvg
    },
  ]
  
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    const handleResize = () => {
        setSidebarOpen(false)
    };

    // Initial call to set the device type based on the initial window size
    handleResize();

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden duration-300 ease-linear bg-white  dark:bg-boxdark lg:static  border-stroke lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="flex items-center justify-between w-full gap-4 h-[102px] fixed bg-primary z-9999 px-4 lg:px-6">
        <div className=" flex flex-col items-center justify-center pl-4">
          <Link href="/">
            <IncomeSvg />
          </Link>
          <p className="text-lg font-bold text-white">FinTrack</p>
        </div>
        {
          sidebarOpen &&
          <div className="text-2xl font-bold flex items-center cursor-pointer border border-primary p-2 bg-white " onClick={() => setSidebarOpen(false)}>
            <CrossSvg />
          </div>
        }
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear pt-[110px]">
        <div className="mb-6 flex flex-col gap-3 justify-start py-4 ">
          {
            SidebarOptions.map(({ icon: Icon, link, name }, i) => (
              <Link
                href={link}
                className={`flex gap-2.5 py-1.5 h-12 items-center px-6 font-medium capitalize ${(pathname === link) && "border-l-8 border-l-primary bg-primary bg-opacity-10 text-primary font-bold px-[16px] dark:border-l-primary dark:bg-black dark:text-whiter"}`}
                onClick={() => setSidebarOpen(false)}
                key={i}
              >
                <p className="w-6 h-6"><Icon /></p>
                {name}
              </Link>
            ))
          }
        </div>
      </div>
    </aside >
  );
};

export default Sidebar;
