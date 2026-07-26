import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { FiSearch, FiPlus } from "react-icons/fi";

import { coloumns, NoticeButtons } from "../../utils/NoticeHelper";

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

const NoticeView = () => {

    const [notices, setNotices] = useState([]);

    const [filteredNotices, setFilteredNotices] = useState([]);

    const [loading, setLoading] = useState(false);

    const onNoticeDelete = (id) => {

        const data = notices.filter(n => n._id !== id);

        setNotices(data);

        setFilteredNotices(data);

    };

    useEffect(() => {

        const fetchNotices = async () => {

            setLoading(true);

            try {

                const response = await axios.get(
                    "http://localhost:3000/api/notice",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                if (response.data.success) {

                    let slno = 1;

                    const data = response.data.notice.map(notice => ({

                        _id: notice._id,

                        slno: slno++,

                        notice_name: notice.notice_name,

                        notice_desc: notice.notice_desc,

                        date: new Date(
                            notice.createdAt
                        ).toLocaleDateString(),

                        action: (
                            <NoticeButtons
                                _id={notice._id}
                                onNoticeDelete={onNoticeDelete}
                            />
                        )

                    }));

                    setNotices(data);

                    setFilteredNotices(data);

                }

            } catch (error) {

                alert("Unable to fetch notices");

            }

            setLoading(false);

        }

        fetchNotices();

    }, []);

    const filterNotice = (e) => {

        const records = notices.filter(notice =>

            notice.notice_name
                .toLowerCase()
                .includes(e.target.value.toLowerCase())

        );

        setFilteredNotices(records);

    }

    return (

        <div className="p-8">

            <div className="mb-10">

                <h1 className="text-5xl font-bold text-[#2D2327]">

                    Employee Notice Board

                </h1>

                <div className="mt-3 h-1 w-36 rounded-full bg-[#62466B]" />

                <p className="mt-4 text-[#776D8A]">

                    Publish notices for all employees.

                </p>

            </div>

            <div className="mb-8 flex justify-between">

                <div className="relative w-full max-w-md">

                    <FiSearch className="absolute left-5 top-5" />

                    <input

                        type="text"

                        placeholder="Search Notice..."

                        onChange={filterNotice}

                        className="h-14 w-full rounded-xl border pl-12"

                    />

                </div>

                <Link

                    to="/admin-dashboard/add-notice"

                    className="flex items-center gap-2 rounded-xl bg-[#62466B] px-6 text-white"

                >

                    <FiPlus />

                    New Notice

                </Link>

            </div>

            
            <div className="overflow-hidden rounded-3xl border border-[#ECECEC] bg-white shadow-xl">
            <DataTable

                columns={coloumns}

                data={filteredNotices}

                pagination

                customStyles={customStyles}

                progressPending={loading}

            />
            </div>

        </div>

    )

}

export default NoticeView;