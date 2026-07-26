import axios from "axios";
import React, { useState } from "react";
import { FiRotateCcw, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AddNotice = () => {

    const navigate = useNavigate();

    const [notice, setNotice] = useState({

        notice_name: "",

        notice_desc: ""

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setNotice({

            ...notice,

            [name]: value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(

                "http://localhost:3000/api/notice/add",

                notice,

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );

            if (response.data.success) {

                navigate("/admin-dashboard/notice");

            }

        } catch (error) {

            alert(

                error.response?.data?.error ||

                "Unable to add notice"

            );

        }

    }

    return (

        <div className="p-8">

            <div className="mb-8">

                <h1 className="text-4xl font-bold">

                    Publish Notice

                </h1>

                <div className="mt-2 h-1 w-28 rounded-full bg-[#62466B]" />

            </div>

            <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-lg">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6">

                    <div>

                        <label className="mb-3 block font-semibold">

                            Notice Title

                        </label>

                        <input

                            name="notice_name"

                            onChange={handleChange}

                            className="h-14 w-full rounded-xl border px-5"

                            placeholder="Enter Notice Title"

                        />

                    </div>

                    <div>

                        <label className="mb-3 block font-semibold">

                            Notice Description

                        </label>

                        <textarea

                            rows="8"

                            name="notice_desc"

                            onChange={handleChange}

                            className="w-full rounded-xl border p-5"

                            placeholder="Write the complete notice..."

                        >

                        </textarea>

                    </div>

                    <div className="flex justify-end gap-4">

                        <button

                            type="reset"

                            className="flex items-center gap-2 rounded-xl border border-[#62466B] px-6 py-3"

                        >

                            <FiRotateCcw />

                            Reset

                        </button>

                        <button

                            type="submit"

                            className="flex items-center gap-2 rounded-xl bg-[#62466B] px-6 py-3 text-white"

                        >

                            <FiSave />

                            Publish Notice

                        </button>

                    </div>

                </form>

            </div>

        </div>

    )

}

export default AddNotice;