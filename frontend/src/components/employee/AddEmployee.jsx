import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiRotateCcw, FiSave } from "react-icons/fi"
import { fetchDepartments } from "../../utils/EmployeeHelper.jsx";
import { Navigate, useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    useEffect (() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        };
        getDepartments();

    }, []);

const handleChange = (e) => {
    const {name, value, files} = e.target
    if(name === "image") {
        setFormData((prevData) => ({...prevData, [name] : files[0]}))
    } else{
        setFormData((prevData) => ({...prevData, [name] : value}))
    }
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataObj = new FormData()
    Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key])
    })

     try{
            const response = await axios.post("http://localhost:3000/api/employee/add", formDataObj, {
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
<div className="p-8">

    {/* Heading */}

    <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#2D2327]">
            Add New Employee
        </h1>

        <div className="mt-2 h-1 w-28 rounded-full bg-[#62466B]"></div>

        <p className="mt-3 text-[#776D8A]">
            Fill in the employee information to register a new employee.
        </p>
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
                    onChange={handleChange}
                    placeholder="Enter employee name"
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none transition focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                />
            </div>

            {/* Email */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter employee email"
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                />
            </div>

            {/* Employee ID */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Employee ID
                </label>

                <input
                    type="text"
                    name="employeeId"
                    onChange={handleChange}
                    placeholder="Enter employee Id"
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                />
            </div>

            {/* Date of Birth */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Date of Birth
                </label>

                <input
                    type="date"
                    name="dob"
                    onChange={handleChange}
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                />
            </div>

            {/* Gender */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Gender
                </label>

                <select
                    name="gender"
                    onChange={handleChange}
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                >
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
            </div>

            {/* Marital Status */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Marital Status
                </label>

                <select
                    name="maritalStatus"
                    onChange={handleChange}
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
                    placeholder="Enter employee designation"
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
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                >
                    <option value="" >Select Department</option>
                    {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
                    ))}
                </select>
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
                    placeholder="Enter Salary"
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                />
            </div>

            {/* Password */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="********"
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                />
            </div>

            {/* Role */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Role
                </label>

                <select
                    name="role"
                    onChange={handleChange}
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                >
                    <option>Select Role</option>
                    <option value={"admin"}>Admin</option>
                    <option value={"employee"}>Employee</option>
                </select>
            </div>

            {/* Upload Image */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Upload Image
                </label>

                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    className="block w-full rounded-xl border border-[#A1ABB0] bg-white file:mr-4 file:rounded-lg file:border-0 file:bg-[#62466B] file:px-5 file:py-3 file:font-semibold file:text-white hover:file:bg-[#45364B]"
                />
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
                    Add Employee
                </button>

            </div>

        </form>

    </div>

</div>
);
}


export default AddEmployee