import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ReallocateEmployee = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);

    const [employee, setEmployee] = useState(null);

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({

        department: "",

        designation: ""

    });

    useEffect(() => {

        fetchEmployee();

        fetchDepartments();

    }, []);


    const fetchEmployee = async () => {

        try {

            const response = await axios.get(

                `http://localhost:3000/api/employee/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );

            if (response.data.success) {

                setEmployee(response.data.employee);

                setFormData({

                    department: response.data.employee.department._id,

                    designation: response.data.employee.designation

                });

            }

        } catch (error) {

            console.log(error);

        }

    }

    const fetchDepartments = async () => {

        try {

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

            setLoading(false);

        } catch (error) {

            console.log(error);

        }

    }

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await axios.put(

            `http://localhost:3000/api/employee/reallocate/${id}`,

            form,

            {
                headers: {
                    Authorization:
                    `Bearer ${localStorage.getItem("token")}`
                }
            }

        );

        if(response.data.success){

            alert("Employee Reallocated Successfully");

            navigate("/admin-dashboard/employee-management");

        }

    }
    catch(error){

        if(error.response){
            alert(error.response.data.error);
        }

    }

    }

    return (

        <div className="p-8">

            <div className="max-w-3xl rounded-3xl bg-white p-10 shadow-xl">

                <h1 className="mb-8 text-3xl font-bold text-[#2D2327]">

                    Reallocate Employee

                </h1>

                {employee && (

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <div>

                            <label className="font-semibold">

                                Employee Name

                            </label>

                            <input

                                value={employee.userId.name}

                                disabled

                                className="mt-2 h-12 w-full rounded-xl border bg-gray-100 px-4"

                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                Current Department

                            </label>

                            <input

                                value={employee.department.dept_name}

                                disabled

                                className="mt-2 h-12 w-full rounded-xl border bg-gray-100 px-4"

                            />

                        </div>

                        <div>

                            <label className="font-semibold">

                                New Department

                            </label>

                            <select

                                name="department"

                                value={formData.department}

                                onChange={handleChange}

                                className="mt-2 h-12 w-full rounded-xl border px-4"

                            >

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

                        <div>

                            <label className="font-semibold">

                                Designation

                            </label>

                            <input

                                name="designation"

                                value={formData.designation}

                                onChange={handleChange}

                                className="mt-2 h-12 w-full rounded-xl border px-4"

                            />

                        </div>

                        <div className="flex justify-end">

                            <button

                                className="rounded-xl bg-[#62466B] px-6 py-3 text-white hover:bg-[#45364B]"

                            >

                                Save Changes

                            </button>

                        </div>

                    </form>

                )}

            </div>

        </div>

    )

}

export default ReallocateEmployee