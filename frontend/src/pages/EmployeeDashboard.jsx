import React from "react";
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Dashboard/Navbar.jsx'
import Sidebar from "../components/Employee_Dashboard/Sidebar.jsx";

const EmployeeDashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 min-h-screen bg-[#B5C2B7]">
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default EmployeeDashboard