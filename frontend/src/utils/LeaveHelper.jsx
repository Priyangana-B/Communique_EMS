import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";

export const coloumns = [
  {
    name: (
      <span className="font-semibold text-[15px] tracking-wide">
        Sl No
      </span>
    ),
    selector: (row) => row.slno,
    sortable: true,
    width: "80px",
    center: true,
  },

  {
    name: (
      <span className="font-semibold text-[15px] tracking-wide">
        Employee ID
      </span>
    ),
    selector: (row) => row.employeeId,
    sortable: true,
    width: "140px",
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
    width: "220px",
  },

  {
    name: (
      <span className="font-semibold text-[15px] tracking-wide">
        Leave Type
      </span>
    ),
    cell: (row) => (
      <span className="rounded-full bg-[#62466B]/10 px-3 py-1 text-sm font-semibold text-[#62466B]">
        {row.leaveType}
      </span>
    ),
    width: "170px",
    center: true,
  },

  {
    name: (
      <span className="font-semibold text-[15px] tracking-wide">
        Department
      </span>
    ),
    selector: (row) => row.dept_name,
    sortable: true,
    width: "190px",
  },

  {
    name: (
      <span className="font-semibold text-[15px] tracking-wide">
        Days
      </span>
    ),
    selector: (row) => row.days,
    sortable: true,
    width: "100px",
    center: true,
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
        case "Approved":
          bgColor = "bg-green-100";
          textColor = "text-green-700";
          break;

        case "Rejected":
          bgColor = "bg-red-100";
          textColor = "text-red-700";
          break;

        default:
          bgColor = "bg-yellow-100";
          textColor = "text-yellow-700";
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
        Action
      </span>
    ),
    cell: (row) => row.action,
    center: true,
    grow: 1,
  },
];

export const LeaveButtons = ({ _id }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/admin-dashboard/leaves/${_id}`);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleView}
        className="flex h-10 items-center gap-2 rounded-xl bg-[#62466B] px-4 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#45364B]"
      >
        <FiEye size={16} />
        View
      </button>
    </div>
  );
};