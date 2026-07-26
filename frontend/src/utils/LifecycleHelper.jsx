import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FiRepeat,
  FiUserX
} from "react-icons/fi";

export const columns = [

  {
    name: "Sl No",
    selector: row => row.slno,
    width: "80px",
    center: true
  },

  {
    name: "Employee ID",
    selector: row => row.employeeId,
    sortable: true,
    width: "150px"
  },

  {
    name: "Employee Name",
    selector: row => row.name,
    sortable: true,
    width: "220px"
  },

  {
    name: "Designation",
    selector: row => row.designation,
    width: "220px"
  },

  {
    name: "Status",

    cell: row => {

      return (

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            row.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>

      );

    },

    center: true

  },

  {
    name: "Action",

    cell: row => row.action,

    grow: 2,

    center: true

  }

];

export const LifecycleButtons = ({ employee }) => {

    const navigate = useNavigate();

    const terminateEmployee = async () => {

        if (!window.confirm("Terminate this employee?")) return;

        try {

            const reason = prompt("Reason for termination:");

            if (reason === null) return;

            const response = await axios.patch(

                `http://localhost:3000/api/employee/terminate/${employee._id}`,

                {
                    reason
                },

                {
                    headers: {

                        Authorization: `Bearer ${localStorage.getItem("token")}`

                    }
                }

            );

            if (response.data.success) {

                alert("Employee terminated.");

                window.location.reload();

            }

        } catch (error) {

            console.log(error);

            alert("Unable to terminate employee.");

        }

    };

    return (

        <div className="flex gap-3">

            <button
            disabled={employee.status === "Terminated"}
                onClick={() =>
                    navigate(`/admin-dashboard/lifecycle/reallocate/${employee._id}`)
                }
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-white transition 
                    ${employee.status === "Terminated"

                        ? "bg-gray-400 cursor-not-allowed"

                        : "bg-[#62466B] hover:bg-[#45364B]"}

                `}
            >
                <FiRepeat size={16} />
                Reallocate
            </button>

            <button

                disabled={employee.status === "Terminated"}

                onClick={terminateEmployee}

                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-white transition 
                    ${employee.status === "Terminated"

                        ? "bg-gray-400 cursor-not-allowed"

                        : "bg-red-600 hover:bg-red-700"}

                `}

            >

                <FiUserX />

                Terminate

            </button>

        </div>

    );

};