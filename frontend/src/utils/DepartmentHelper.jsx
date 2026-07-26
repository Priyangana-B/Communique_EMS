import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const coloumns = [
  {
    name: (
      <span className="font-semibold text-[15px] tracking-wide">
        Sl No
      </span>
    ),
    selector: (row) => row.slno,
    sortable: true,
    width: "110px",
  },

  {
    name: (
      <span className="font-semibold text-[15px] tracking-wide">
        Department Name
      </span>
    ),
    selector: (row) => row.dept_name,
    sortable: true,
    grow: 3,
  },

  {
    name: (
      <span className="font-semibold text-[15px] tracking-wide">
        Actions
      </span>
    ),
    cell: (row) => row.action,
    center: true,
    width: "260px",
  },
];

export const DepartmentButtons = ({_id, onDeptDelete}) => {
    const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center gap-3">

      <button
        className="flex items-center gap-2 rounded-xl bg-[#62466B] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#45364B]"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        <FiEdit2 size={15} />
        Edit
      </button>

      <button
        className="flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-300 hover:bg-red-100"
        onClick={() => navigate(`/admin-dashboard/delete-department/${_id}`)}
      >
        <FiTrash2 size={15} />
        Delete
      </button>

    </div>
  );
};