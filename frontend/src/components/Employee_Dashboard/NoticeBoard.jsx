import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineNotification } from "react-icons/ai";
import { TiPinOutline } from "react-icons/ti";

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotices = async () => {
    try {

        const response = await axios.get(
            "http://localhost:3000/api/notice",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        if (response.data.success) {

            const sortedNotices = response.data.notice.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            setNotices(sortedNotices);
            console.log(response.data.notice);

        }

    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);

    }
};

useEffect(() => {
    fetchNotices();
}, []);


  return (
    
    <div className="mt-6 p-8 overflow-hidden">

    <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#2D2327]">
            Notice
          </h1>

          <div className="mt-2 h-1 w-32 rounded-full bg-[#62466B]"></div>
        </div>
        {
loading ? (

<div className="flex h-60 items-center justify-center">

    <div className="h-120 w-12 animate-spin rounded-full border-4 border-[#62466B] border-t-transparent"></div>

</div>

) : (

    notices.length === 0 ? (

<div className="flex h-56 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D9D9D9]">

    <div className="text-6xl">
        <AiOutlineNotification />
    </div>

    <h3 className="mt-5 text-xl font-semibold text-[#45364B]">
        No Notices Available
    </h3>

    <p className="mt-2 text-[#776D8A]">
        There are currently no announcements.
    </p>

</div>

) : (

<div className="space-y-6">

    {notices.map((notice) => {
        const isNew = new Date() - new Date(notice.createdAt) < 1000 * 60 * 60 * 24 * 3;
        
return(
        <div
            key={notice._id}
            className="rounded-2xl border border-[#ECE7F2] bg-[#F9F8FC] p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
        >

            {/* Header */}

            <div className="flex items-start justify-between">

                <div>

                    <h3 className="text-xl font-bold text-[#45364B]">

                        <div className="flex items-center gap-3">

    <h3 className="text-xl font-bold text-[#45364B]">
        <TiPinOutline /> {notice.notice_name}
    </h3>

    {isNew && (

        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">

            NEW

        </span>

    )}

</div>

                    </h3>

                    <p className="mt-2 text-sm text-[#776D8A]">

                        {new Date(notice.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
})}

                    </p>

                </div>

            </div>

            {/* Divider */}

            <div className="my-5 h-px bg-[#E5DFF0]"></div>

            {/* Description */}

            <p className="leading-8 text-[#555]">

                {notice.notice_desc}

            </p>

        </div>
);

    })}

</div>

)

)
}
    </div>
  );
};

export default NoticeBoard;