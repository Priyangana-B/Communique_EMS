import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiRotateCcw, FiSave } from "react-icons/fi"
import { fetchDepartments } from "../../utils/EmployeeHelper.jsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
    const [employee, setEmployee] = useState(
        {
            name: '',
            maritalStatus: '',
            designation: '',
            salary: 0,
            department: ''
        }
    )
    const [departments, setDepartments] = useState(null)
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect (() => {
            const getDepartments = async () => {
                const departments = await fetchDepartments()
                setDepartments(departments)
            };
            getDepartments();
    
        }, []);

    useEffect(() => {
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
            const employee = response.data.employee
          setEmployee((prev) => ({...prev, 
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department
        }))
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

const handleChange = (e) => {
    const {name, value } = e.target
    setEmployee((prevData) => ({...prevData, [name] : value}))
}

const handleSubmit = async (e) => {
    e.preventDefault()

    

     try{
            const response = await axios.put(`http://localhost:3000/api/employee/${id}`, employee, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                navigate("/admin-dashboard/employees")
            }
        }catch (error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
}

    return (
        <>{departments && employee ? (
<div className="p-8">

    {/* Heading */}

    <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#2D2327]">
            Edit Employee
        </h1>

        <div className="mt-2 h-1 w-28 rounded-full bg-[#62466B]"></div>

    </div>

    {/* Form Card */}

    <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-lg">

        <form onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >

            {/* Name */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Full Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Enter employee name"
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none transition focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                />
            </div>


            {/* Marital Status */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Marital Status
                </label>

                <select
                    name="maritalStatus"
                    onChange={handleChange}
                    value={employee.maritalStatus}
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                >
                    <option>Select Status</option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                </select>
            </div>

            {/* Designation */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Designation
                </label>

                <input
                    type="text"
                    name="designation"
                    onChange={handleChange}
                    value={employee.designation}
                    placeholder="Enter employee designation"
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                />
            </div>


            {/* Salary */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Salary
                </label>

                <input
                    type="number"
                    name="salary"
                    onChange={handleChange}
                    value={employee.salary}
                    placeholder="Enter Salary"
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                />
            </div>

            {/* Department */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Department
                </label>

                <select
                    name="department"
                    onChange={handleChange}
                    value={employee.department}
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                >
                    <option value="" >Select Department</option>
                    {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
                    ))}
                </select>
            </div>

            {/* Buttons */}

            <div className="col-span-1 mt-6 flex justify-end gap-4 md:col-span-2">

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
                    <FiSave />
                    Edit Employee
                </button>

            </div>

        </form>

    </div>

</div>

    ) : <div>Loading...</div>}</>
);
}


export default EditEmployee