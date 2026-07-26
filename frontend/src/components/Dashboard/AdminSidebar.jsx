import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo.jsx";
import { FiRepeat, FiEdit } from "react-icons/fi";

import {
  FiLayers,
  FiUsers,
  FiBriefcase,
  FiCalendar,
  FiSettings,
  FiAward,
} from "react-icons/fi";

const AdminSidebar = () => {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 rounded-xl px-5 py-2.5 text-base font-medium transition-all duration-300
    ${
      isActive
        ? "bg-[#776D8A] text-white shadow-md"
        : "text-[#E8E8E8] hover:bg-[#8C93A8]/30 hover:text-white"
    }`;

  return (
    <aside className="flex min-h-screen w-72 flex-col bg-[#62466B] shadow-2xl">

      {/* Logo Section */}

      <div className="border-b border-[#B5C2B7]/30 px-6 py-8">

        <div className="flex items-center gap-4">

          <Logo size={55} />

          <div>
            <h1 className="font-cinzel text-2xl font-bold text-white">
              Communique
            </h1>

            <p className="mt-1 text-xs tracking-wide text-[#D8D8D8]">
              Employee Management System
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="mt-8 flex flex-1 flex-col gap-2 px-4">

        <NavLink to="/admin-dashboard" end className={menuClass}>
          <FiLayers size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin-dashboard/employees" className={menuClass}>
          <FiUsers size={20} />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/admin-dashboard/departments" className={menuClass}>
          <FiBriefcase size={20} />
          <span>Departments</span>
        </NavLink>

        <NavLink to="/admin-dashboard/leaves" className={menuClass}>
          <FiCalendar size={20} />
          <span>Leaves</span>
        </NavLink>

        <NavLink to="/admin-dashboard/salary/add" className={menuClass}>
          <FiAward size={20} />
          <span>Salary</span>
        </NavLink>

        <NavLink to="/admin-dashboard/lifecycle" className={menuClass}>
          <FiRepeat size={20}/>
          <span>Employee Lifecycle</span>
        </NavLink>

        <NavLink to="/admin-dashboard/notice" className={menuClass}>
          <FiEdit size={20}/>
          <span>Add Notice</span>
        </NavLink>

        <NavLink to="/admin-dashboard/setting" className={menuClass}>
          <FiSettings size={20} />
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* Footer */}

      <div className="border-t border-[#B5C2B7]/30 p-6">

        <div className="rounded-xl bg-[#776D8A]/40 p-4">

          <p className="text-sm font-semibold text-white">
            Administrator
          </p>

          <p className="mt-1 text-xs text-[#E6E6E6]">
            Manage employees and system settings.
          </p>

        </div>

      </div>

    </aside>
  );
};

export default AdminSidebar;