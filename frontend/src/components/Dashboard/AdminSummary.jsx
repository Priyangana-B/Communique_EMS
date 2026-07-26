import React, { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import axios from 'axios'

import {
  FiBriefcase,
  FiUsers,
  FiPenTool,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

import { HiCurrencyRupee } from "react-icons/hi";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try{
        const summary= await axios.get('http://localhost:3000/api/dashboard/summary', {
          headers : {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        setSummary(summary.data)
      }catch(error){
        if(error.response){
          alert(error.response.data.error)
        }
        console.log(error.message)
      }
    }
    fetchSummary()

  }, [])

  if(!summary) {
    return(
      <div>Loading...</div>
    )
  }

  return (
    <div className="p-8 ">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-[#2D2327]">
          Dashboard Overview
        </h1>

        <div className="mt-2 h-1 w-24 rounded-full bg-[#62466B]"></div>

      </div>

      {/* Top Cards */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        <SummaryCards
          icon={<FiUsers />}
          category="Total Employees"
          totalnum={summary.totalEmployees}
          color="#62466B"
        />

        <SummaryCards
          icon={<FiBriefcase />}
          category="Departments"
          totalnum={summary.totalDepartments}
          color="#776D8A"
        />

        <SummaryCards
          icon={<HiCurrencyRupee />}
          category="Monthly Salary"
          totalnum={summary.totalSalary}
          color="#45364B"
        />

      </div>

      {/* Leave Section */}

      <div className="mt-12">

        <h2 className="mb-6 text-3xl font-bold text-[#2D2327]">
          Leave Overview
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <SummaryCards
            icon={<FiPenTool />}
            category="Employees who applied Leave"
            totalnum={summary.leaveSummary.appliedFor}
            color="#8C93A8"
          />

          <SummaryCards
            icon={<FiCheckCircle />}
            category="Leaves Approved"
            totalnum={summary.leaveSummary.approved}
            color="#62466B"
          />

          <SummaryCards
            icon={<FiClock />}
            category="Leaves Pending"
            totalnum={summary.leaveSummary.pending}
            color="#45364B"
          />

          <SummaryCards
            icon={<FiXCircle />}
            category="Leaves Rejected"
            totalnum={summary.leaveSummary.rejected}
            color="#776D8A"
          />

        </div>

      </div>

    </div>
  );
};

export default AdminSummary;