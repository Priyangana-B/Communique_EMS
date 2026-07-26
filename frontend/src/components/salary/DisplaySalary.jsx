import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DisplaySalary = () => {
    const [salaries, setSalaries] = useState(null)
    const [filteredSalaries, setFilteredSalaries] = useState(null)
    const {id} = useParams()
    let slno = 1

    const fetchSalaries = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/api/salary/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (response.data.success) {
                setSalaries(response.data.salary)
                setFilteredSalaries(response.data.salary)
            }
        }catch (error) {
            if (error.response && !error.response.data.success){
                alert(error.message)
            }
        }
    }


    useEffect(() => {
        fetchSalaries();
    }, []);

    const filterSalaries = (q) => {
        const filetredRecords = salaries.filter((salary) =>
        salary.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    setFilteredSalaries(filetredRecords)
    }

    return (
  <div className="p-8">

    {/* Heading */}

    <div className="mb-10">
      <h1 className="text-5xl font-bold text-[#2D2327]">
        Salary History
      </h1>

      <div className="mt-3 h-1 w-32 rounded-full bg-[#62466B]"></div>

      <p className="mt-4 text-base text-[#776D8A]">
        View salary payment records of the selected employee.
      </p>
    </div>

    {/* Search */}

    <div className="mb-8 flex justify-between">

      <div className="relative w-full max-w-md">

        <input
          type="text"
          placeholder="Search Employee ID..."
          onChange={filterSalaries}
          className="h-14 w-full rounded-2xl border border-[#D5D8DD] bg-white px-5 text-[15px] shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#62466B] focus:ring-4 focus:ring-[#62466B]/20"
        />

      </div>

    </div>

    {/* Table */}

    <div className="overflow-hidden rounded-3xl border border-[#ECECEC] bg-white shadow-xl">

      {filteredSalaries === null ? (

        <div className="flex h-40 items-center justify-center">

          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#62466B] border-t-transparent"></div>

        </div>

      ) : filteredSalaries.length > 0 ? (

        <table className="min-w-full">

          <thead className="bg-[#F7F4FA]">

            <tr className="border-b">

              <th className="px-6 py-5 text-left font-bold text-[#2D2327]">
                Sl No
              </th>

              <th className="px-6 py-5 text-left font-bold text-[#2D2327]">
                Employee ID
              </th>

              <th className="px-6 py-5 text-left font-bold text-[#2D2327]">
                Basic Salary
              </th>

              <th className="px-6 py-5 text-left font-bold text-[#2D2327]">
                Allowance
              </th>

              <th className="px-6 py-5 text-left font-bold text-[#2D2327]">
                Deduction
              </th>

              <th className="px-6 py-5 text-left font-bold text-[#2D2327]">
                Net Salary
              </th>

              <th className="px-6 py-5 text-left font-bold text-[#2D2327]">
                Pay Date
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredSalaries.map((salary) => (

              <tr
                key={salary._id}
                className="border-b transition hover:bg-[#F8F6FA]"
              >

                <td className="px-6 py-5">{slno++}</td>

                <td className="px-6 py-5 font-semibold text-[#62466B]">
                  {salary.employeeId.employeeId}
                </td>

                <td className="px-6 py-5">
                  ₹ {salary.basicSalary.toLocaleString()}
                </td>

                <td className="px-6 py-5 text-green-600 font-semibold">
                  + ₹ {salary.allowances.toLocaleString()}
                </td>

                <td className="px-6 py-5 text-red-600 font-semibold">
                  − ₹ {salary.deductions.toLocaleString()}
                </td>

                <td className="px-6 py-5">

                  <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">

                    ₹ {salary.netSalary.toLocaleString()}

                  </span>

                </td>

                <td className="px-6 py-5">

                  {new Date(salary.payDate).toLocaleDateString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      ) : (

        <div className="py-12 text-center text-lg font-medium text-[#776D8A]">

          No Salary Records Found

        </div>

      )}

    </div>

  </div>
);
}

export default DisplaySalary