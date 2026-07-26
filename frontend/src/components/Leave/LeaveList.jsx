import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useAuth } from '../../context/authContext.jsx'
import axios from 'axios'

const LeaveList = () => {

    const [leaves, setLeaves] = useState([])
    let slno = 1
    const {id} = useParams()
    const {user} = useAuth()

    const fetchLeaves = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/api/leave/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (response.data.success) {
                console.log(response.data);
                setLeaves(response.data.leaves)
            }
        }catch (error) {
            if (error.response?.status === 404) {
                setLeaves([]);
                return;
            }

            alert(error.response?.data?.error || "Something went wrong");
        }
    }

    useEffect(() => {
        fetchLeaves();
    }, []);

  return (
    <div className="p-8">

      {/* Heading */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold text-[#2D2327]">
          Manage Leaves
        </h1>

        <div className="mt-3 h-1 w-32 rounded-full bg-[#62466B]"></div>

        <p className="mt-4 text-base text-[#776D8A]">
          View your leave history and submit new leave requests.
        </p>
      </div>

      {/* Search + Button */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="relative w-full max-w-md">

          <FiSearch
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#776D8A]"
          />

          <input
            type="text"
            placeholder="Search by Employee Name..."
            className="h-14 w-full rounded-2xl border border-[#D5D8DD] bg-white pl-14 pr-5 text-[15px] shadow-sm outline-none transition duration-300 placeholder:text-gray-400 focus:border-[#62466B] focus:ring-4 focus:ring-[#62466B]/20"
          />

        </div>
        {user.role === "employee" && 
        <Link
          to="/employee-dashboard/add-leave"
          className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#62466B] px-7 text-base font-semibold text-white shadow-md transition hover:bg-[#45364B]"
        >
          <FiPlus size={20} />
          Request Leave
        </Link>
        }

      </div>

      {/* Table Placeholder */}

        <div className="overflow-hidden rounded-3xl border border-[#ECECEC] bg-white shadow-xl">

    <div className="overflow-x-auto">

        <table className="min-w-full">

            <thead className="bg-[#F7F4FA]">

                <tr>

                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-[#2D2327]">
                        Sl No
                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-[#2D2327]">
                        Leave Type
                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-[#2D2327]">
                        From Date
                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-[#2D2327]">
                        To Date
                    </th>

                    <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-[#2D2327]">
                        Reason
                    </th>

                    <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-[#2D2327]">
                        Status
                    </th>

                    <th className="px-6 py-5 text-center text-sm font-bold uppercase tracking-wide text-[#2D2327]">
                        Applied At
                    </th>

                </tr>

            </thead>

            <tbody>

                {leaves.length > 0 ? (

                    leaves.map((leave) => (

                        <tr
                            key={leave._id}
                            className="border-t border-[#ECECEC] transition duration-300 hover:bg-[#FAF8FC]"
                        >

                            <td className="px-6 py-5 font-medium text-[#45364B]">
                                {slno++}
                            </td>

                            <td className="px-6 py-5">

                                <span className="rounded-full bg-[#62466B]/10 px-4 py-2 text-sm font-semibold text-[#62466B]">

                                    {leave.leaveType}

                                </span>

                            </td>

                            <td className="px-6 py-5 text-[#555]">

                                {new Date(leave.startDate).toLocaleDateString()}

                            </td>

                            <td className="px-6 py-5 text-[#555]">

                                {new Date(leave.endDate).toLocaleDateString()}

                            </td>

                            <td className="max-w-sm px-6 py-5 text-[#555]">

                                {leave.reason}

                            </td>

                            <td className="px-6 py-5 text-center">

                                <span
                                    className={`rounded-full px-4 py-2 text-sm font-semibold
                                    ${
                                        leave.status === "Approved"
                                            ? "bg-green-100 text-green-700"
                                            : leave.status === "Rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >

                                    {leave.status}

                                </span>

                            </td>

                            <td className="px-6 py-5 text-center text-[#555]">

                                {new Date(leave.appliedAt).toLocaleDateString()}

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td
                            colSpan="7"
                            className="py-16 text-center"
                        >

                            <div>

                                <h3 className="text-2xl font-semibold text-[#2D2327]">

                                    No Leave Requests

                                </h3>

                                <p className="mt-2 text-[#776D8A]">

                                    Your leave requests will appear here.

                                </p>

                            </div>

                        </td>

                    </tr>

                )}

            </tbody>

        </table>

    </div>

</div>

        {/* <div className="overflow-hidden rounded-3xl border border-[#ECECEC] bg-white shadow-xl">

        <div className="flex h-80 items-center justify-center">

          <div className="text-center">

            <h3 className="text-2xl font-semibold text-[#2D2327]">
              No Leave Requests
            </h3>

            <p className="mt-2 text-[#776D8A]">
              Your leave requests will appear here.
            </p>

          </div>

        </div>

      </div> */}

    </div>
  );
};

export default LeaveList;