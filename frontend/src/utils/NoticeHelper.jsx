import axios from "axios";
import { FiTrash2 } from "react-icons/fi";

export const coloumns = [
  {
    name: "Sl No",
    selector: row => row.slno,
    width: "90px"
  },

  {
    name: "Notice Title",
    selector: row => row.notice_name,
    grow: 3
  },

  {
    name: "Notice Description",
    selector: row => row.notice_desc,
    wrap: true,
    grow: 3
  },

  {
    name: "Published On",
    selector: row => row.date,
    width: "170px"
  },

  {
    name: "Action",
    cell: row => row.action,
    center: true,
    width: "180px"
  }
];

export const NoticeButtons = ({ _id, onNoticeDelete }) => {

    const deleteNotice = async () => {

        const confirmDelete = window.confirm(
            "Do you want to delete this notice?"
        );

        if (!confirmDelete) return;

        try {

            const response = await axios.delete(
                `http://localhost:3000/api/notice/${_id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if(response.data.success){
                onNoticeDelete(_id);
            }

        } catch (error) {

            alert(
                error.response?.data?.error ||
                "Unable to delete notice."
            );

        }

    };

    return (

        <button
            onClick={deleteNotice}
            className="flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
            <FiTrash2 size={15}/>
            Delete
        </button>

    );

};