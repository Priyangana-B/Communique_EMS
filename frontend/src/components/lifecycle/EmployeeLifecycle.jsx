import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeLifecycleTable from "./EmployeeLifecycleTable";

const EmployeeLifecycle = () => {

    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState("");

    useEffect(() => {

        const fetchDepartments = async () => {

            const response = await axios.get(
                "http://localhost:3000/api/department",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (response.data.success) {
                setDepartments(response.data.departments);
            }

        };

        fetchDepartments();

    }, []);

    return (

        <div className="p-8">

            <h1 className="text-4xl font-bold text-[#2D2327]">
                Employee Lifecycle Management
            </h1>

            <p className="mt-3 text-[#776D8A]">
                Manage employee transfers and terminations.
            </p>

            <div className="mt-8">

                <select
                    className="h-14 w-96 rounded-xl border px-4"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >

                    <option value="">
                        Select Department
                    </option>

                    {
                        departments.map(dep => (
                            <option
                                key={dep._id}
                                value={dep._id}
                            >

                                {dep.dept_name}

                            </option>
                        ))
                    }

                </select>

            </div>

            {
                department &&
                <EmployeeLifecycleTable departmentId={department} />
            }

        </div>

    )

}

export default EmployeeLifecycle;