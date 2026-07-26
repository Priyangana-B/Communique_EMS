import React from "react";
import { useAuth } from "../../context/authContext";
import { FiLogOut, FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Welcome";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <header className="flex h-20 items-center justify-between rounded-bl-3xl bg-[#A1ABB0] px-8 shadow-2xl">

      {/* Left */}

      <div>
        <h2 className="text-2xl font-semibold text-[#2D2327]">
          {greeting},
          <span className="ml-2 text-[#62466B]">
            {user?.name || "Administrator"}
          </span>
        </h2>

        <p className="mt-1 text-sm text-gray-800">
          Welcome back to the Employee Management System
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* User */}

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#62466B] text-white">
            <FiUser className="text-xl" />
          </div>

          <div className="hidden md:block">
            <h4 className="font-semibold text-[#2D2327]">
              {user?.name || "Administrator"}
            </h4>

            <p className="text-sm capitalize text-gray-800">
              {user?.role}
            </p>
          </div>

        </div>

        {/* Logout */}

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-xl bg-[#62466B] px-5 py-3 font-medium text-white transition duration-300 hover:bg-[#45364B]"
        >
          <FiLogOut />

          Logout
        </button>

      </div>

    </header>
  );
};

export default Navbar;