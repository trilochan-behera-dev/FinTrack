import { useState, useEffect, useRef } from "react";
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
import ArrowDownSvg from "../Svg/ArrowDownSvg"
import LifetimeSvg from "../Svg/LifetimeSvg"
import { usePathname } from "next/navigation";
import MonthlySvg from "../Svg/MonthlySvg";
import YearlySvg from "../Svg/YearlySvg";
import SignOut from "../Svg/signOut";
import Button from "../Button";
import { useRouter } from "next/router";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const router = useRouter();

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // State to track which submenu is open
  // const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const SidebarOptions = [
    {
      name: 'Dashboard',
      link: "/",
      icon: DashboardSvg,
      // submenu: [
      //   { name: 'Monthly', link: '/dashboard/monthly', icon: MonthlySvg },
      //   { name: 'Yearly', link: '/dashboard/yearly' , icon: YearlySvg},
      //   { name: 'Lifetime', link: '/dashboard/lifetime', icon: LifetimeSvg}
      // ]
    },
    {
      name: 'Expense',
      link: "/expense",
      icon: ExpenseSideSvg
    },
    {
      name: 'Savings',
      link: "/savings",
      icon: SavingSideSvg,
    },
    {
      name: 'Income',
      link: "/income",
      icon: IncomeSideSvg,
    },
    {
      name: 'Investments',
      link: "/investment",
      icon: MonthlySvg
    },
    {
      name: 'Loan Management',
      link: "/loan",
      icon: YearlySvg,
    },
    {
      name: 'EMI/Subscriptions',
      link: "/emi",
      icon: LifetimeSvg,
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
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('login-user');
    router.push('login');
  }

  // const toggleSubmenu = (name: string) => {
  //   setOpenSubmenu(openSubmenu === name ? null : name);
  // };

  // Handle click outside to close the sidebar
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Handle escape key to close the sidebar
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Store sidebar expanded state
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  // Close sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);

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
        <div className="mb-4 flex flex-col gap-1 justify-start py-4 ">
          {
            SidebarOptions.map(({ icon: Icon, link, name }, i) => (
              //  submenu ? (
              //   <div key={i}>
              //     <div
              //       className={`flex items-center justify-between gap-2.5 py-1 h-12 px-6 font-medium capitalize cursor-pointer ${(pathname === link) && "border-l-8 border-l-primary bg-primary bg-opacity-10 text-primary font-bold px-[16px] dark:border-l-primary dark:bg-black dark:text-whiter"}`}
              //       onClick={() => submenu ? toggleSubmenu(name) : setSidebarOpen(false)}
              //     >
                    
              //       <div className="flex items-center gap-1.5 pl-1 text-md">
              //         <Icon height={24} width={24}/>
              //         <span className="mb-0.5">{name}</span>
              //       </div>
              //       {/* {submenu && (
              //         <ArrowDownSvg
              //           className={`w-4 h-4 transform ${openSubmenu === name ? "rotate-180" : "rotate-0"
              //             } transition-transform duration-200 ease-in-out`}
              //           fill="#8e8e8e"
              //         />
              //       )} */}
              //     </div>
              //     <div
              //       className={`pl-8 overflow-hidden transition-all duration-300 ease-in-out ${openSubmenu === name ? "max-h-[300px]" : "max-h-0"}`}>
              //       {submenu.map(({ icon: SubIcon, link, name },j) => (
              //         <Link
              //           href={link}
              //           className={`flex gap-2.5 py-1 h-10 items-center px-6 font-medium capitalize ${(pathname === link) && "border-l-8 border-l-primary bg-primary bg-opacity-10 text-primary font-bold px-[16px] dark:border-l-primary dark:bg-black dark:text-whiter"}`}
              //           key={j}
              //         >
              //           <SubIcon fill={"#8e8e8e"} month="may" height={20} width={20}/>
              //           <span className="mb-0.5">{name}</span>
              //         </Link>
              //       ))}
              //     </div>
              //   </div>
              // )
              // :
              <Link
                href={link}
                className={`flex h-12 items-center px-6 font-medium capitalize ${(pathname === link) && "border-l-8 border-l-primary bg-primary bg-opacity-10 text-primary font-bold px-[16px] dark:border-l-primary dark:bg-black dark:text-whiter"} ${name=="dashboard" ? "gap-1":"gap-2.5"}`}
                onClick={() => setSidebarOpen(false)}
                key={i}
              >
                <Icon height={20} width={20}/>
                <span className="mb-0.5">{name}</span>
              </Link>
            ))
          }
        </div>
          <Button
            label={"Sign Out"}
            type={"submit"}
            className="flex items-center gap-0.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"  
            handleClick={handleLogout}
            icon={<SignOut/>}
          />
      </div>
    </aside >
  );
};

export default Sidebar;
