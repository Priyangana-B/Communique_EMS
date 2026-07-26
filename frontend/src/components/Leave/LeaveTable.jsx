import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { coloumns } from "../../utils/LeaveHelper";
import axios from 'axios'
import { LeaveButtons } from "../../utils/LeaveHelper";
import { FiSearch } from "react-icons/fi";

const LeaveTable = () => {

    const [leaves, setLeaves] = useState(null)
    const [filteredLeaves, setFilteredLeaves] = useState(null)
    const fetchLeaves = async () => {
        try {
        const response = await axios.get(
          "http://localhost:3000/api/leave",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let slno = 1;

          const data = await response.data.leaves.map((leave) => ({
            _id: leave._id,
            slno: slno++,
            employeeId: leave.employeeId.employeeId,
            name: leave.employeeId.userId.name,
            leaveType: leave.leaveType,
            dept_name: leave.employeeId.department.dept_name,
              days:
                  Math.ceil(
                      (new Date(leave.endDate) - new Date(leave.startDate)) /
                      (1000 * 60 * 60 * 24)
                  ) + 1,
            status: leave.status,
            action: (<LeaveButtons _id={leave._id}/>),
          }));

          setLeaves(data);
          setFilteredLeaves(data);
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Unable to fetch departments.");
        }
      }
    }

    useEffect(() => {
        fetchLeaves()
    }, [])

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#F7F4FA",
                minHeight: "65px",
                borderBottom: "1px solid #ECECEC"
            }
        },

        headCells: {
            style: {
                color: "#2D2327",
                fontSize: "15px",
                fontWeight: 700
            }
        },

        rows: {
            style: {
                minHeight: "68px",
                fontSize: "14px",
                "&:hover": {
                    backgroundColor: "#F9F6FB"
                }
            }
        },

        pagination: {
            style: {
                borderTop: "1px solid #ECECEC",
                minHeight: "60px"
            }
        }
    }

    const filterByInput = (e) => {
        const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredLeaves(data)
    }


    const filterByButton = (status) => {
    if (status === "All") {
        setFilteredLeaves(leaves);
        return;
    }

    const data = leaves.filter((leave) =>
        leave.status.toLowerCase().includes(status.toLowerCase())
    );

    setFilteredLeaves(data);
    };
    
    return(
        <>{filteredLeaves ? (
        <div className="p-8">

            {/* Heading */}

            <div className="mb-10">
                <h1 className="text-4xl font-bold text-[#2D2327]">
                    Leave Management
                </h1>

                <div className="mt-2 h-1 w-32 rounded-full bg-[#62466B]"></div>

                <p className="mt-3 text-[#776D8A]">
                    View, manage and approve employee leave requests.
                </p>
            </div>

            {/* Search + Button */}

            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                {/* Search */}

                <div className="relative w-full max-w-md">

                    <FiSearch
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 -translate-y-1/2 text-[#776D8A]"
                    />

                    <input
                        type="text"
                        placeholder="Search Employee..."
                        onChange={filterByInput}
                        className="h-14 w-full rounded-2xl border border-[#D5D8DD] bg-white pl-14 pr-5 shadow-sm outline-none transition focus:border-[#62466B] focus:ring-4 focus:ring-[#62466B]/20"
                    />

                </div>

                {/* Status Buttons */}

                <div className="flex gap-3">

                    <button onClick={() => filterByButton("All")} className="rounded-xl bg-slate-200 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-300">
                        All
                    </button>

                    <button onClick={() => filterByButton("Pending")} className="rounded-xl bg-[#62466B] px-5 py-3 font-medium text-white transition hover:bg-[#45364B]">
                        Pending
                    </button>

                    <button onClick={() => filterByButton("Approved")} className="rounded-xl bg-green-100 px-5 py-3 font-medium text-green-700 transition hover:bg-green-200">
                        Approved
                    </button>

                    <button onClick={() => filterByButton("Rejected")} className="rounded-xl bg-red-100 px-5 py-3 font-medium text-red-700 transition hover:bg-red-200">
                        Rejected
                    </button>

                </div>

            </div>
            <div className="overflow-hidden rounded-3xl border border-[#ECECEC] bg-white shadow-xl">

                <DataTable
                    columns={coloumns}
                    data={filteredLeaves}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                    persistTableHead
                    customStyles={customStyles}
                />

            </div>
        </div>
        ) :(<div>Loading...</div>
    )}</>
    )
}

export default LeaveTable