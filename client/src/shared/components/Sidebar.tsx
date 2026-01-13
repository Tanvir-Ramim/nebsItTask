import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import {
  HiOutlineLogout,
} from "react-icons/hi";
import { TiArrowLeft } from "react-icons/ti";
import { MdNotificationAdd } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebar.current && !sidebar.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <aside
      ref={sidebar}
      className={`fixed left-0 top-0 z-9999 flex h-screen w-52 flex-col bg-white shadow-xl duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="flex border-b border-gray-300 items-center justify-center px-2 py-5">
        <NavLink to="/">
          <img className="lg:w-full w-[80%]" src={logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden cursor-pointer text-2xl text-gray-600"
        >
          <TiArrowLeft size={30} />
        </button>
      </div>

      {/* Menu */}
      <div className="flex flex-1 items-center">
        <nav className="w-full px-4">
          <ul className="flex flex-col gap-2">
            <SidebarItem
              to="/"
              icon={<FaRegListAlt  />}
              label="Notice List"
              
            />
            <SidebarItem
              to="/craete-notice"
              icon={<MdNotificationAdd />}
              label="Add Notice"
            />
          </ul>
        </nav>
      </div>

      {/* Logout */}
      <div className="px-4 pb-6">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-3 text-sm font-semibold text-red-600 hover:bg-red-100">
          <HiOutlineLogout className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarItem = ({ to, icon, label }: SidebarItemProps) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <span className="text-xl">{icon}</span>
      {label}
    </NavLink>
  </li>
);
