import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEdit3, FiTag } from "react-icons/fi";
import { BsCashStack } from "react-icons/bs";


export const coloumns = [
  {
    name: (
      <span className="font-semibold text-[15px]  tracking-wide">
        Sl No
      </span>
    ),
    selector: (row) => row.slno,
    sortable: true,
    width: "70px",
  },

  {
    name: (
      <span className="font-semibold text-[15px] tracking-wide">
        Profile
      </span>
    ),
    cell: (row) => (
      <img
        src={`http://localhost:3000/${row.profileImage}`}
        className="h-12 w-12 rounded-full border-2 border-[#776D8A] object-cover shadow-md"
      />
    ),
    width: "100px",
    center: true,
  },

  {
    name: (
      <span className="font-semibold text-[15px] tracking-wide">
        Employee Name
      </span>
    ),
    selector: (row) => row.name,
    sortable: true,
    width: "200px",
  },

  {
    name: (
      <span className="font-semibold items-center text-[15px] tracking-wide">
        DoB
      </span>
    ),
    selector: (row) => row.dob,
    sortable: true,
    width: "120px",
  },

  {
    name: (
      <span className="font-semibold text-[15px] tracking-wide">
        Department
      </span>
    ),
    selector: (row) => row.dept_name,
    sortable: true,
    width: "150px",
  },

  {
    name: (
      <span className="font-semibold text-[15px] tracking-wide">
        Status
      </span>
    ),
    cell: (row) => {
      let bgColor = "";
      let textColor = "";

      switch (row.status) {
        case "Active":
          bgColor = "bg-green-100";
          textColor = "text-green-700";
          break;

        case "Terminated":
          bgColor = "bg-red-100";
          textColor = "text-red-700";
          break;
      }

      return (
        <span
          className={`rounded-full px-4 py-1 text-sm font-semibold ${bgColor} ${textColor}`}
        >
          {row.status}
        </span>
        );
      },
    width: "150px",
    center: true,
  },

  {
    name: (
        <span className="font-semibold text-[15px] tracking-wide">
            Actions
        </span>
    ),
    cell: (row) => (
        <div className="flex items-center gap-2">
            {row.action}
        </div>
    ),
    center: true,
    grow: 1,
    }
]

export const fetchDepartments = async () => {
    let departments

      try {
        const response = await axios.get(
          "http://localhost:3000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          departments = response.data.departments
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
      }
      return departments
    };


// fetch employees for salary form
export const getEmployees = async (id) => {
    let employees

      try {
        const response = await axios.get(
          `http://localhost:3000/api/employee/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          employees = response.data.employees
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
      }
      return employees
    };

export const EmployeeButtons = ({_id}) => {
    const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center gap-2">

  {/* View */}
  <button
    onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
    className="flex h-9 items-center gap-1 rounded-lg bg-[#62466B] px-3 text-xs font-medium text-white shadow-sm transition hover:bg-[#45364B]"
  >
    <FiEye size={14} />
    View
  </button>

  {/* Edit */}
  <button
    onClick={()=> navigate(`/admin-dashboard/employees/edit/${_id}`)}
    className="flex h-9 items-center gap-1 rounded-lg bg-amber-100 px-3 text-xs font-medium text-amber-700 shadow-sm transition hover:bg-amber-200"
  >
    <FiEdit3 size={14} />
    Edit
  </button>

  {/* Salary */}
  <button
  onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
    className="flex h-9 items-center gap-1 rounded-lg bg-emerald-100 px-3 text-xs font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-200"
  >
    <BsCashStack size={14} />
    Salary
  </button>

  {/* Leave */}
  <button
    onClick={() => navigate(`/admin-dashboard/employees/leaves/${_id}`)}
    className="flex h-9 items-center gap-1 rounded-lg bg-sky-100 px-3 text-xs font-medium text-sky-700 shadow-sm transition hover:bg-sky-200"
  >
    <FiTag size={14} />
    Leave
  </button>

</div>
  );
};