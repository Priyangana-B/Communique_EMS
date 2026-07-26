import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiRotateCcw, FiSave } from "react-icons/fi"
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper.jsx";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const AddSalary = () => {
    const [employee, setEmployee] = useState(
        {
            employeeId: null,
            basicSalary: 0,
            allowances: 0,
            deductions: 0,
            payDate: null
        }
    )
    const [departments, setDepartments] = useState(null)
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    useEffect (() => {
            const getDepartments = async () => {
                const departments = await fetchDepartments()
                setDepartments(departments)
            };
            getDepartments();
    
        }, []);

    

const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value)
        setEmployees(emps)
}


const handleChange = (e) => {
    const {name, value } = e.target
    setEmployee((prevData) => ({...prevData, [name] : value}))
}

const handleSubmit = async (e) => {
    e.preventDefault()

     try{
            const response = await axios.post(`http://localhost:3000/api/salary/add`, employee, {
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
            Add Salary
        </h1>

        <div className="mt-2 h-1 w-28 rounded-full bg-[#62466B]"></div>

    </div>

    {/* Form Card */}

    <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-lg">

        <form onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >



            {/* Department */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Department
                </label>

                <select
                    name="department"
                    onChange={handleDepartment}
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                >
                    <option value="" >Select Department</option>
                    {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
                    ))}
                </select>
            </div>


            {/* Employee */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Employee
                </label>

                <select
                    name="employeeId"
                    onChange={handleChange}
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                >
                    <option value="" >Select Employee</option>
                    {employees.map((emp) => (
                        <option key={emp._id} value={emp._id}>
                            {emp.employeeId}
                        </option>
                    ))}
                </select>
            </div>


            {/* Basic Salary */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Basic salary
                </label>

                <input
                    type="number"
                    name="basicSalary"
                    onChange={handleChange}
                    placeholder="Enter employee basic salary"
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                />
            </div>


            {/* Allowances */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Allowances
                </label>

                <input
                    type="number"
                    name="allowances"
                    onChange={handleChange}
                    placeholder="Enter allowance"
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                />
            </div>

            {/* Deductions */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Deductions
                </label>

                <input
                    type="number"
                    name="deductions"
                    onChange={handleChange}
                    placeholder="Enter deductions"
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                />
            </div>

            {/* Pay Date */}

            <div>
                <label className="mb-3 block text-lg font-semibold text-[#45364B]">
                    Pay Date
                </label>

                <input
                    type="date"
                    name="payDate"
                    onChange={handleChange}
                    placeholder="Enter pay-date"
                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 outline-none focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
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
                    Add Salary
                </button>

            </div>

        </form>

    </div>

</div>

    ) : <div>Loading...</div>}</>
);
}


export default AddSalary