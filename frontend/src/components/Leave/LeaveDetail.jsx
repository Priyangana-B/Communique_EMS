import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiCheck, FiX } from "react-icons/fi";


const LeaveDetail = () => {
    const {id} = useParams()
    const [leave, setLeave] = useState(null)
    const navigate = useNavigate()

    useEffect (() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeave(response.data.leave)
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Unable to fetch departments.");
        }
      }
    };

    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
        const response = await axios.put(
          `http://localhost:3000/api/leave/${id}`, {status},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          navigate('/admin-dashboard/leaves')
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Unable to fetch departments.");
        }
      }

  }

    return (
  <>
    {leave ? (
      <div className="p-8 min-h-screen">

        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#2D2327]">
            Leave Details
          </h1>

          <div className="mt-2 h-1 w-32 rounded-full bg-[#62466B]"></div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left Card */}

          <div className="rounded-3xl bg-white p-8 shadow-lg">

            <div className="flex flex-col items-center">

              <img
                src={`http://localhost:3000/${leave.employeeId.userId.profileImage}`}
                alt={leave.employeeId.userId.name}
                className="h-44 w-44 rounded-full border-4 border-[#62466B] object-cover shadow-lg"
              />

              <h2 className="mt-6 text-2xl font-bold text-[#2D2327]">
                {leave.employeeId.userId.name}
              </h2>

              <p className="mt-2 rounded-full bg-[#62466B]/10 px-5 py-2 font-semibold text-[#62466B]">
                {leave.employeeId.designation}
              </p>

              <div className="mt-8 w-full border-t pt-6">

                <div className="flex justify-between py-3">
                  <span className="font-semibold text-[#776D8A]">
                    Employee ID
                  </span>

                  <span className="font-medium text-[#2D2327]">
                    {leave.employeeId.employeeId}
                  </span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="font-semibold text-[#776D8A]">
                    Department
                  </span>

                  <span className="font-medium text-[#2D2327]">
                    {leave.employeeId.department.dept_name}
                  </span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="font-semibold text-[#776D8A]">
                    Salary
                  </span>

                  <span className="font-bold text-green-600">
                    ₹ {leave.employeeId.salary.toLocaleString()}
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* Right Card */}

          <div className="lg:col-span-2 rounded-3xl bg-white p-10 shadow-lg">

            <h2 className="mb-8 text-2xl font-bold text-[#2D2327]">
              Personal Information
            </h2>

            <div className="grid gap-8 md:grid-cols-2">

              <InfoItem
                label="Full Name"
                value={leave.employeeId.userId.name}
              />

              <InfoItem
                label="Email Address"
                value={leave.employeeId.userId.email}
              />


              <InfoItem
                label="Leave Type"
                value={leave.leaveType}
              />

              <InfoItem
                label="Reason"
                value={leave.reason}
              />

              <InfoItem
                label="Start Date"
                value={new Date(leave.startDate).toLocaleDateString()}
              />

              <InfoItem
                label="End Date"
                value={new Date(leave.endDate).toLocaleDateString()}
              />

                <div className="rounded-2xl border border-[#ECE7F2] bg-[#F9F8FC] p-5">

                    <p className="text-sm font-semibold uppercase tracking-wide text-[#776D8A]">
                        {leave.status === "Pending" ? "Action" : "Status"}
                    </p>

                    <div className="mt-4">

                        {leave.status === "Pending" ? (

                            <div className="flex gap-4">

                                <button
                                    onClick={() => changeStatus(leave._id, "Approved")}
                                    className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-700"
                                >
                                    <FiCheck size={16} />
                                        Approve
                                </button>

                                <button
                                    onClick={() => changeStatus(leave._id, "Rejected")}
                                    className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700"
                                >
                                    <FiX size={16} />
                                        Reject
                                                </button>

                                            </div>

                                        ) : (

                            <span
                                className={`inline-flex rounded-full px-5 py-2 text-sm font-semibold
                        ${leave.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                            >
                                {leave.status}
                            </span>

                        )}

                    </div>

                 </div>

            </div>

          </div>

        </div>

      </div>
    ) : (
      <div className="flex h-screen items-center justify-center">

        <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#62466B] border-t-transparent"></div>

      </div>
    )}
  </>
);
}

const InfoItem = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-[#ECE7F2] bg-[#F9F8FC] p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#776D8A]">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold text-[#2D2327]">
        {value}
      </p>
    </div>
  );
};

export default LeaveDetail