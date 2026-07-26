import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiRefreshCw, FiTrash2 } from "react-icons/fi";

const DeleteDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
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
        setEmployees(response.data.employees);

        if (response.data.employees.length > 0) {
          setDepartmentName(
            response.data.employees[0].department.dept_name
          );
        }
      }
    } catch (error) {
      alert(error.response?.data?.error || "Unable to fetch employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const terminateEmployee = async (empId) => {
    const confirm = window.confirm(
      "Terminate this employee?"
    );

    if (!confirm) return;

    try {
      const response = await axios.put(
        `http://localhost:3000/api/employee/terminate/${empId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchEmployees();
      }
    } catch (error) {
      alert(error.response?.data?.error);
    }
  };

  const deleteDepartment = async () => {
    const activeEmployees = employees.filter(
      (emp) => emp.status === "Active"
    );

    if (activeEmployees.length > 0) {
      return alert(
        "Please relocate or terminate all active employees first."
      );
    }

    const confirm = window.confirm(
      "Delete this department permanently?"
    );

    if (!confirm) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/department/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Department deleted successfully.");
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      alert(error.response?.data?.error);
    }
  };

  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active"
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">

      {/* Heading */}

      <div className="mb-8">

        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-[#62466B] hover:underline"
        >
          <FiArrowLeft />
          Back
        </button>

        <h1 className="text-4xl font-bold text-[#2D2327]">
          Delete Department
        </h1>

        <div className="mt-2 h-1 w-32 rounded-full bg-[#62466B]"></div>

        <p className="mt-4 text-[#776D8A]">
          Department :
          <span className="ml-2 font-semibold text-[#62466B]">
            {departmentName}
          </span>
        </p>

      </div>

      {/* Warning */}

      {activeEmployees.length > 0 ? (
        <div className="mb-8 rounded-2xl border border-yellow-300 bg-yellow-50 p-6">
          <h3 className="text-xl font-bold text-yellow-700">
            Department cannot be deleted
          </h3>

          <p className="mt-2 text-yellow-600">
            Please terminate or relocate every active employee before deleting
            this department.
          </p>
        </div>
      ) : (
        <div className="mb-8 rounded-2xl border border-green-300 bg-green-50 p-6">
          <h3 className="text-xl font-bold text-green-700">
            Department is ready for deletion.
          </h3>
        </div>
      )}

      {/* Employee Table */}

      <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

        <table className="w-full">

          <thead className="bg-[#F7F4FA]">

            <tr>

              <th className="p-5 text-left">Employee</th>

              <th>Status</th>

              <th>Designation</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {employees.map((emp) => (

              <tr
                key={emp._id}
                className="border-b hover:bg-[#F9F8FC]"
              >

                <td className="flex items-center gap-4 p-5">

                  <img
                    src={`http://localhost:3000/${emp.userId.profileImage}`}
                    className="h-14 w-14 rounded-full object-cover"
                    alt=""
                  />

                  <div>

                    <p className="font-semibold">
                      {emp.userId.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {emp.employeeId}
                    </p>

                  </div>

                </td>

                <td>

                  <span
                    className={`rounded-full px-4 py-1 text-sm font-semibold
                    ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {emp.status}
                  </span>

                </td>

                <td>{emp.designation}</td>

                <td>

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        navigate(
                          `/admin-dashboard/lifecycle/reallocate/${emp._id}`
                        )
                      }
                      disabled={emp.status === "Terminated"}
                      className={`rounded-xl px-4 py-2 font-medium text-white
                        ${
                          emp.status === "Terminated"
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-[#62466B] hover:bg-[#45364B]"
                        }`}
                    >
                      <FiRefreshCw className="mr-2 inline" />
                      Reallocate
                    </button>

                    <button
                      onClick={() => terminateEmployee(emp._id)}
                      disabled={emp.status === "Terminated"}
                      className={`rounded-xl px-4 py-2 font-medium text-white
                        ${
                          emp.status === "Terminated"
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                    >
                      <FiTrash2 className="mr-2 inline" />
                      Terminate
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Delete Button */}

      <div className="mt-10 flex justify-end">

        <button
          disabled={activeEmployees.length > 0}
          onClick={deleteDepartment}
          className={`rounded-xl px-8 py-4 font-semibold text-white transition
            ${
              activeEmployees.length > 0
                ? "cursor-not-allowed bg-gray-400"
                : "bg-red-600 hover:bg-red-700"
            }`}
        >
          Delete Department
        </button>

      </div>

    </div>
  );
};

export default DeleteDepartment;