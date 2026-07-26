import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { coloumns, EmployeeButtons } from "../../utils/EmployeeHelper";

const customStyles = {
  table: {
    style: {
      backgroundColor: "#ffffff",
      borderRadius: "18px",
    },
  },

  headRow: {
    style: {
      minHeight: "65px",
      backgroundColor: "#F7F4FA",
      borderBottom: "2px solid #ECECEC",
    },
  },

  headCells: {
    style: {
      color: "#2D2327",
      fontSize: "15px",
      fontWeight: "700",
    },
  },

  rows: {
    style: {
      minHeight: "72px",
      fontSize: "15px",
      fontWeight: "500",
      color: "#2D2327",
      transition: "all .2s ease",

      "&:hover": {
        backgroundColor: "#F8F6FA",
        cursor: "pointer",
      },
    },
  },

  cells: {
    style: {
      paddingTop: "16px",
      paddingBottom: "16px",
    },
  },

  pagination: {
    style: {
      borderTop: "1px solid #ECECEC",
      minHeight: "60px",
    },
  },
};

const EmployeeView = () => {

    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading ] = useState(false)
    const [filteredEmployees, setFilteredEmployees] = useState([])

    useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);

      try {
        const response = await axios.get(
          "http://localhost:3000/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let slno = 1;

          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            slno: slno++,
            dept_name: emp.department.dept_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: emp.userId.profileImage,
            status: emp.status,
            action: (<EmployeeButtons _id={emp._id}/>),
          }));

          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Unable to fetch departments.");
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployees(records)
  }

    return(
        <div className="p-8">
            {/* Page Heading */}

            <div className="mb-10">

                <h1 className="text-5xl font-bold text-[#2D2327]">
                    Manage Employees
                </h1>

                <div className="mt-3 h-1 w-36 rounded-full bg-[#62466B]"></div>

                <p className="mt-4 text-base text-[#776D8A]">
                    Manage, edit and organize all employees within your organization.
                </p>

            </div>

            {/* Search & Button */}

            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="relative w-full max-w-md">

                    <FiSearch
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[#776D8A]"
                    />

                    <input
                    type="text"
                    placeholder="Search Employees..."
                    onChange={handleFilter}
                    className="h-14 w-full rounded-2xl border border-[#D5D8DD] bg-white pl-14 pr-5 text-[15px] shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#62466B] focus:ring-4 focus:ring-[#62466B]/20"
                    />

                </div>

                <Link
                to="/admin-dashboard/add-employee"
                className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#62466B] px-7 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#45364B]"
                >
                    <FiPlus size={20} />
                    Add New Employee
                </Link>

            </div>

             {/* Table */}

      <div className="overflow-hidden rounded-3xl border border-[#ECECEC] bg-white shadow-xl">

        {empLoading ? (

          <div className="flex h-40 items-center justify-center">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#62466B] border-t-transparent"></div>

          </div>

        ) : (

          <DataTable
            columns={coloumns}
            data={filteredEmployees}
            pagination
            responsive
            highlightOnHover
            striped
            customStyles={customStyles}
            noDataComponent={
              <div className="py-12 text-lg font-medium text-[#776D8A]">
                No Employees Found
              </div>
            }
          />

        )}

      </div>
        </div>
    )
}

export default EmployeeView