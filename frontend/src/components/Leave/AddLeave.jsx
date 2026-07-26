import React, { useState } from "react";
import { FiRotateCcw, FiSend } from "react-icons/fi";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddLeave = () => {

    const {user} = useAuth()
    const [leave, setLeave] = useState({
        userId: user._id
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post(
          `http://localhost:3000/api/leave/add`, leave,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          navigate('/employee-dashboard/leaves')
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Unable to fetch departments.");
        }
      }
    };

    return (
        <div className="p-8">

            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-[#2D2327]">
                    Request Leave
                </h1>

                <div className="mt-2 h-1 w-28 rounded-full bg-[#62466B]"></div>

                <p className="mt-3 text-[#776D8A]">
                    Submit your leave request for approval.
                </p>

            </div>

            {/* Form */}

            <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-lg">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-7"
                >

                    {/* Leave Type */}

                    <div>

                        <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                            Leave Type
                        </label>

                        <select
                            name="leaveType"
                            onChange={handleChange}
                            required
                            className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none transition focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                        >
                            <option value="">Select Leave Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                        </select>

                    </div>

                    {/* From Date */}

                    <div>

                        <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                            From Date
                        </label>

                        <input
                            type="date"
                            name="startDate"
                            onChange={handleChange}
                            required
                            className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none transition focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                        />

                    </div>

                    {/* To Date */}

                    <div>

                        <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                            To Date
                        </label>

                        <input
                            type="date"
                            name="endDate"
                            onChange={handleChange}
                            required
                            className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none transition focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                        />

                    </div>

                    {/* Reason */}

                    <div>

                        <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                            Reason
                        </label>

                        <textarea
                            name="reason"
                            rows="6"
                            placeholder="Please describe the reason for your leave request..."
                            onChange={handleChange}
                            className="w-full resize-none rounded-xl border border-[#A1ABB0] px-5 py-4 outline-none transition placeholder:text-gray-400 focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                        />

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4">

                        <button
                            type="reset"
                            className="flex items-center gap-2 rounded-xl border-2 border-[#62466B] px-6 py-3 font-semibold text-[#62466B] transition hover:bg-[#62466B] hover:text-white"
                        >
                            <FiRotateCcw />
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-xl bg-[#62466B] px-8 py-3 font-semibold text-white shadow-md transition hover:bg-[#45364B]"
                        >
                            <FiSend />
                            Submit Request
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddLeave;