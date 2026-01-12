import { useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import {
  HiOutlineBell,
  HiOutlineClipboardList,
  HiOutlineLogout,
} from "react-icons/hi";
import { TiArrowLeft } from "react-icons/ti";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLElement | null>(null);

  return (
    <aside
      ref={sidebar}
      className={`fixed left-0 top-0 z-9999 flex h-screen w-60 flex-col bg-white shadow-xl duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* ================= Header ================= */}
      <div className="flex  items-center justify-center px-2 py-5 ">
        <NavLink to="/">
          <img src={logo} alt="Logo"  />
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-2xl text-gray-600"
        >
          <TiArrowLeft />
        </button>
      </div>

      {/* ================= Menu (Middle) ================= */}
      <div className="flex flex-1 items-center">
        <nav className="w-full px-4">
          <ul className="flex flex-col gap-2">
            <SidebarItem
              to="/notice"
              icon={<HiOutlineBell />}
              label="Notice Board"
            />
            <SidebarItem
              to="/notice-list"
              icon={<HiOutlineClipboardList />}
              label="Notice List"
            />
          </ul>
        </nav>
      </div>

      {/* ================= Logout (Bottom Fixed) ================= */}
      <div className="px-4 pb-6">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100">
          <HiOutlineLogout className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

/* ================= Reusable Menu Item ================= */
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
