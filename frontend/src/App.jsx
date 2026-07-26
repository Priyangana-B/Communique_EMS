import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import RoleBasedProtectedRoutes from "./utils/RoleBasedProtectedRoutes.jsx";
import AdminSummary from "./components/Dashboard/AdminSummary.jsx";
import DepartmentsView from "./components/department/DepartmentsView.jsx";
import AddDepartment from "./components/department/AddDepartment.jsx";
import EditDepartment from "./components/department/EditDepartment.jsx";
import EmployeeView from "./components/employee/EmployeeView.jsx";
import AddEmployee from "./components/employee/AddEmployee.jsx";
import EditEmployee from "./components/employee/EditEmployee.jsx";
import ViewEmployee from "./components/employee/ViewEmployee.jsx";
import AddSalary from "./components/salary/AddSalary.jsx";
import DisplaySalary from "./components/salary/DisplaySalary.jsx";
import LeaveList from "./components/Leave/LeaveList.jsx";
import AddLeave from "./components/Leave/AddLeave.jsx";
import EmployeeSetting from "./components/Employee_Dashboard/EmployeeSetting.jsx";
import LeaveTable from "./components/Leave/LeaveTable.jsx";
import LeaveDetail from "./components/Leave/LeaveDetail.jsx";
import EmployeeLifecycle from "./components/lifecycle/EmployeeLifecycle";
import ReallocateEmployee from "./components/Lifecycle/ReallocateEmployee";
import DeleteDepartment from "./components/department/DeleteDepartment.jsx";
import AddNotice from "./components/NoticeBoard/AddNotice.jsx";
import NoticeView from "./components/NoticeBoard/NoticeView.jsx";
import NoticeBoard from "./components/Employee_Dashboard/NoticeBoard.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedProtectedRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedProtectedRoutes>
          </PrivateRoutes>
          }>
            <Route index element={<AdminSummary />}></Route>
            <Route path='/admin-dashboard/departments' element={<DepartmentsView />}></Route>
            <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
            <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>
            <Route path="/admin-dashboard/delete-department/:id" element={<DeleteDepartment />}/>
            
            
            <Route path="/admin-dashboard/employees" element={<EmployeeView />}></Route>
            <Route path="/admin-dashboard/add-employee" element={<AddEmployee />}></Route>
            <Route path="/admin-dashboard/employees/:id" element={<ViewEmployee />}></Route>
            <Route path="/admin-dashboard/employees/edit/:id" element={<EditEmployee />}></Route>
            <Route path="/admin-dashboard/employees/salary/:id" element={<DisplaySalary />}></Route>
            
            <Route path="/admin-dashboard/leaves" element={<LeaveTable />}></Route>
            <Route path="/admin-dashboard/leaves/:id" element={<LeaveDetail />}></Route>
            <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />}></Route>
            
            <Route path="/admin-dashboard/salary/add" element={<AddSalary />}></Route>

            <Route path="/admin-dashboard/lifecycle" element={<EmployeeLifecycle />}></Route>

            <Route path="/admin-dashboard/lifecycle/reallocate/:id" element={<ReallocateEmployee />}></Route>

            <Route path="/admin-dashboard/setting" element={<EmployeeSetting />}></Route>

            <Route path="/admin-dashboard/notice" element={<NoticeView />}></Route>

            <Route path="/admin-dashboard/add-notice" element={<AddNotice />}></Route>
            
          </Route>
        <Route path="/employee-dashboard" element={
            <PrivateRoutes>
              <RoleBasedProtectedRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBasedProtectedRoutes>
            </PrivateRoutes>  
        }>
        <Route index element={<NoticeBoard />}></Route>
        <Route path="/employee-dashboard/profile/:id" element={<ViewEmployee />}></Route>
        <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />}></Route>
        <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
        <Route path="/employee-dashboard/salary/:id" element={<DisplaySalary />}></Route>
        <Route path="/employee-dashboard/setting" element={<EmployeeSetting />}></Route>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
