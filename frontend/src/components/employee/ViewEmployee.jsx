import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const ViewEmployee = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState(null)

    useEffect (() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee(response.data.employee)
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Unable to fetch departments.");
        }
      }
    };

    fetchEmployee();
  }, []);
    return (
  <>
    {employee ? (
      <div className="p-8 min-h-screen">

        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#2D2327]">
            Employee Details
          </h1>

          <div className="mt-2 h-1 w-32 rounded-full bg-[#62466B]"></div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left Card */}

          <div className="rounded-3xl bg-white p-8 shadow-lg">

            <div className="flex flex-col items-center">

              <img
                src={`http://localhost:3000/${employee.userId.profileImage}`}
                alt={employee.userId.name}
                className="h-44 w-44 rounded-full border-4 border-[#62466B] object-cover shadow-lg"
              />

              <h2 className="mt-6 text-2xl font-bold text-[#2D2327]">
                {employee.userId.name}
              </h2>

              <p className="mt-2 rounded-full bg-[#62466B]/10 px-5 py-2 font-semibold text-[#62466B]">
                {employee.designation}
              </p>

              <div className="mt-8 w-full border-t pt-6">

                <div className="flex justify-between py-3">
                  <span className="font-semibold text-[#776D8A]">
                    Employee ID
                  </span>

                  <span className="font-medium text-[#2D2327]">
                    {employee.employeeId}
                  </span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="font-semibold text-[#776D8A]">
                    Department
                  </span>

                  <span className="font-medium text-[#2D2327]">
                    {employee.department.dept_name}
                  </span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="font-semibold text-[#776D8A]">
                    Salary
                  </span>

                  <span className="font-bold text-green-600">
                    ₹ {employee.salary.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="font-semibold text-[#776D8A]">
                    Status
                  </span>
                  <span className={`inline-flex rounded-full px-5 py-2 text-sm font-semibold
                      ${employee.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                            >
                                {employee.status}
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
                value={employee.userId.name}
              />

              <InfoItem
                label="Email Address"
                value={employee.userId.email}
              />

              <InfoItem
                label="Date of Birth"
                value={new Date(employee.dob).toLocaleDateString()}
              />

              <InfoItem
                label="Gender"
                value={employee.gender}
              />

              <InfoItem
                label="Marital Status"
                value={employee.maritalStatus}
              />

              <InfoItem
                label="Designation"
                value={employee.designation}
              />

              <InfoItem
                label="Department"
                value={employee.department.dept_name}
              />

              <InfoItem
                label="Salary"
                value={`₹ ${employee.salary.toLocaleString()}`}
              />

              <InfoItem
                label="Role"
                value={employee.userId.role}
              />

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

export default ViewEmployee