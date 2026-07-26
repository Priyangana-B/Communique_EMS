import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiSave, FiRotateCcw } from "react-icons/fi";

const EditDepartment = () => {
    const {id} = useParams()
    const [department, setDepartment] = useState([])
    const [deptLoading, setDeptLoading] = useState(false)

    useEffect(() => {
    const fetchDepartments = async () => {
      setDeptLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:3000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepartment(response.data.department)
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Unable to fetch departments.");
        }
      } finally {
        setDeptLoading(false);
      }
    };

    fetchDepartments();
  }, []);

    const navigate = useNavigate()

                                                                 
    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name] : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.put(`http://localhost:3000/api/department/${id}`, department, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                navigate("/admin-dashboard/departments")
            }
        }catch (error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
    
    return(
        <>{deptLoading ? <div>Loading...</div> : 
        <div className="p-8">
        
                    {/* Heading */}
        
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-[#2D2327]">
                            Edit Department
                        </h1>
        
                        <div className="mt-2 h-1 w-28 rounded-full bg-[#62466B]"></div>
        
                    </div>
        
                    {/* Form Card */}
        
                    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-lg">
        
                        <form onSubmit={handleSubmit} className="space-y-1">
        
                            {/* Department Name */}
        
                            <div>
        
                                <label
                                    htmlFor="dept_name"
                                    className="mb-3 block text-lg font-semibold text-[#45364B]"
                                >
                                    Department Name
                                </label>
        
                                <input
                                    id="dept_name"
                                    name="dept_name"
                                    type="text"
                                    placeholder="Please enter department name"
                                    onChange={handleChange}
                                    value={department.dept_name}
                                    className="h-14 w-full rounded-xl border border-[#A1ABB0] px-5 text-base outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20"
                                />
        
                            </div>
        
                            {/* Description */}
        
                            <div>
        
                                <label
                                    htmlFor="dept_desc"
                                    className="mb-3 block text-lg font-semibold text-[#45364B]"
                                >
                                    Description
                                </label>
        
                                <textarea
                                    id="dept_desc"
                                    name="dept_desc"
                                    rows="6"
                                    placeholder="Add department description..."
                                    onChange={handleChange}
                                    value={department.dept_desc}   
                                    className="w-full rounded-xl border border-[#A1ABB0] px-5 py-4 text-base outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#62466B] focus:ring-4 focus:ring-[#776D8A]/20 resize-none"
                                />
        
                            </div>
        
                            {/* Buttons */}
        
                            <div className="flex justify-end gap-4">
        
                                <button
                                    type="reset"
                                    className="flex items-center gap-2 rounded-xl border-2 border-[#62466B] px-6 py-3 font-semibold text-[#62466B] transition duration-300 hover:bg-[#62466B] hover:text-white"
                                >
                                    <FiRotateCcw />
                                    Reset
                                </button>
        
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-xl bg-[#62466B] px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-[#45364B]"
                                >
                                    <FiSave />
                                    Edit Department
                                </button>
        
                            </div>
        
                        </form>
        
                    </div>
        
                </div>
                }</>
    )
}

export default EditDepartment