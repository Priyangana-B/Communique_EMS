import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const EmployeeSetting = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPasword: ""
    })

    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({...setting, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPasword) {
            setError("Paswords do not match!!")
        }else {
            try{
                const response = await axios.put(
                    "http://localhost:3000/api/setting/change-password", setting,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },

                    }
                )
                if (response.data.success) {
                  setError("");

                  if (user.role === "admin") {
                    navigate("/admin-dashboard");
                  } else {
                    navigate("/employee-dashboard");
                  }
                }
            }catch(error) {
                if(error.response && !error.response.data.success) {
                    setError(error.response.data.error)
                }
            }
        }
    }

    return (
  <div className="p-8">

    {/* Heading */}

    <div className="mb-8">
      <h1 className="text-4xl font-bold text-[#2D2327]">
        Account Settings
      </h1>

      <div className="mt-2 h-1 w-32 rounded-full bg-[#62466B]"></div>

      <p className="mt-3 text-[#776D8A]">
        Change your account password to keep your account secure.
      </p>
    </div>

    {/* Settings Card */}

    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">

      <form
        onSubmit={handleSubmit}
        className="space-y-7"
      >

        {/* Error */}

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 px-5 py-4 text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Old Password */}

        <div>
          <label className="mb-3 block text-lg font-semibold text-[#45364B]">
            Old Password
          </label>

          <input
            type="password"
            name="oldPassword"
            value={setting.oldPassword}
            onChange={handleChange}
            placeholder="Enter your current password"
            className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none transition focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
            required
          />
        </div>

        {/* New Password */}

        <div>
          <label className="mb-3 block text-lg font-semibold text-[#45364B]">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            value={setting.newPassword}
            onChange={handleChange}
            placeholder="Enter a new password"
            className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none transition focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
            required
          />
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-3 block text-lg font-semibold text-[#45364B]">
            Confirm New Password
          </label>

          <input
            type="password"
            name="confirmPasword"
            value={setting.confirmPasword}
            onChange={handleChange}
            placeholder="Re-enter your new password"
            className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none transition focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
            required
          />
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4 pt-6">

          <button
            type="button"
            onClick={() => navigate("/employee-dashboard")}
            className="rounded-xl border-2 border-[#62466B] px-7 py-3 font-semibold text-[#62466B] transition hover:bg-[#62466B] hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-[#62466B] px-8 py-3 font-semibold text-white shadow-md transition hover:bg-[#45364B]"
          >
            Update Password
          </button>

        </div>

      </form>

    </div>

  </div>
);
}

export default EmployeeSetting