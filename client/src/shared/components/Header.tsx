import { Link } from "react-router-dom";

import logo from "../assets/Logo.png";
import { LuSquareMenu } from "react-icons/lu";
import IconSvg from "../utils/IconSvg";
import { useState } from "react";
const Header = ({
  setSidebarOpen,
  sidebarOpen,
}: {
  setSidebarOpen: (value: boolean) => void;
  sidebarOpen: boolean;
}) => {
  const now = new Date();
  const hours = now.getHours();

  const getGreeting = () => {
    if (hours >= 5 && hours < 12) return "Good Morning";
    if (hours >= 12 && hours < 17) return "Good Afternoon";
    if (hours >= 17 && hours < 21) return "Good Evening";
    return "Good Night";
  };
  const formattedDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);



  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setSearchOpen(false);
  };


  return (
    <>
      <div className="relative w-full bg-white shadow-black/5 shadow lg:px-9 md:px-6 px-3 sm:py-4.5 py-3 z-50">
        <div className="flex items-center max-w-475 mx-auto justify-between">
          {/* Left */}
          <div className="flex  items-center gap-2">
            <div className="lg:flex flex-col hidden gap-1">
              <h1 className="text-xl font-semibold text-gray-800">
                {getGreeting()} <span className="font-bold">Tanvir</span>
              </h1>

              <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
              <button
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
                className="z-99999 block rounded-sm   bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
              >
                <LuSquareMenu size={25} />
              </button>
              {/* <!-- Hamburger Toggle BTN --> */}

              <Link className="block shrink-0 lg:hidden" to="/">
                <img src={logo} alt="Logo" className="w-28" />
              </Link>
            </div>
          </div>

          {/* Right Desktop */}
          <div className="hidden xl:flex items-center gap-6">
            <div className="flex  items-center gap-4">
              {/* Notification */}
              <div className=" mt-2  cursor-pointer">
                <IconSvg
                  name={"notification"}
                  className="w-6 h-5  text-gray-600"
                />
              </div>
              {/* Divider */}
              <div className="h-6 w-px bg-gray-300"></div>

              {/* Profile */}
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="leading-tight">
                  <p className="text-base font-semibold text-gray-800">
                    Tanvir Hossan
                  </p>
                  <p className="text-xs text-gray-500">Developer</p>
                </div>
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="profile"
                  className="w-9 h-9 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex xl:hidden items-center  gap-4">
            <button className="cursor-pointer" onClick={toggleProfile}>
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="profile"
                className="h-7 w-7 rounded-full border border-[#CDCFD2] object-cover"
              />
            </button>

            {/* <button
              onClick={toggleMenu}
              className=" cursor-pointer pt-1 @2xl:hidden block"
            >
              {menuOpen ? (
                <IconSvg size={32} name={"menu1"} />
              ) : (
                <IconSvg size={32} name={"menu2"} />
              )}
            </button> */}
          </div>
        </div>

        <div
          className={`xl:hidden absolute left-0 top-full w-full bg-white shadow-md z-40 transition-all duration-300 ${
            searchOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3 pointer-events-none"
          }`}
        ></div>

        <div
          className={`xl:hidden absolute left-0 top-full w-full bg-white shadow-md z-40 transition-all duration-300 ${
            profileOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-3 p-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="leading-tight">
                <p className="text-base font-semibold text-gray-800">
                  Tanvir Hossan
                </p>
                <p className="text-xs text-gray-500">Developer</p>
              </div>
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="profile"
                className="w-9 h-9 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
