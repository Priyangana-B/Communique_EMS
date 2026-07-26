import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, LifecycleButtons } from "../../utils/LifecycleHelper";

const EmployeeLifecycleTable = ({ departmentId }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:3000/api/employee/department/${departmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let slno = 1;

        const data = response.data.employees.map((emp) => ({
          _id: emp._id,
          slno: slno++,
          employeeId: emp.employeeId,
          name: emp.userId.name,
          designation: emp.designation,
          department: emp.department.dept_name,
          status: emp.status,
          action: <LifecycleButtons employee={emp} />,
        }));

        setEmployees(data);
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Unable to fetch employees.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (departmentId) {
      fetchEmployees();
    }
  }, [departmentId]);

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#F7F4FA",
        minHeight: "65px",
      },
    },

    headCells: {
      style: {
        fontWeight: "700",
        fontSize: "15px",
        color: "#2D2327",
      },
    },

    rows: {
      style: {
        fontWeight: "500",
        fontSize: "14px",
        minHeight: "70px",
        "&:hover": {
          backgroundColor: "#F9F6FB",
        },
      },
    },
  };

  return (
    <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-xl">

      <DataTable
        columns={columns}
        data={employees}
        progressPending={loading}
        pagination
        responsive
        highlightOnHover
        striped
        customStyles={customStyles}
        noDataComponent={
          <div className="py-10 text-lg text-[#776D8A]">
            No Employees Found
          </div>
        }
      />

    </div>
  );
};

export default EmployeeLifecycleTable;