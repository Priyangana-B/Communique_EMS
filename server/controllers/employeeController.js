import multer from "multer"
import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import path from "path"
import Department from "../models/Department.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

const upload = multer({storage: storage})

const addEmployee = async (req, res) => {
    try {
    const {
        name,
        email,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        password,
        role
    } = req.body;

    const user = await User.findOne({email})
    if(user) {
        return res.status(400).json({success: false, error: "User already exits!!"})
    } 

    const hashPassword =  await bcrypt.hash(password, 10)

    const newUser = new User ({
        name,
        email,
        password: hashPassword,
        role,
        profileImage: req.file ? req.file.filename : ""
    })
    const savedUser = await newUser.save()

    const newEmployee = new Employee({
        userId: savedUser._id,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary
    })

    await newEmployee.save()
    return res.status(200).json({success: true, message: "Employee Added!"})

    }catch (error){
        return res.status(500).json({success: false, error: "Server error while adding employee!!"})
    }
}

const getEmployees = async (req, res) => {
    try{
        const employees = await Employee.find().populate('userId', {password: 0}).populate("department")
        return res.status(200).json({success: true, employees})
    }catch(error)
    {
       return res.status(500).json({success: false, error: "server error! can't get employees!!"}) 
    }
}

const fetchEmployee = async (req, res) => {
    const {id} = req.params;
    try{
        let employee;
        employee = await Employee.findById({_id: id}).populate('userId', {password: 0}).populate("department");
        if(!employee) {
            employee = await Employee.findOne({userId: id}).populate('userId', {password: 0}).populate("department");
        }
        return res.status(200).json({success: true, employee})
    }catch(error)
    {
       return res.status(500).json({success: false, error: "server error! can't get employees!!"}) 
    }
}

const updateEmployee = async (req, res) => {
    try{
        const {id} = req.params;
        const {
            name,
            maritalStatus,
            designation,
            salary,
            department
        } = req.body;

        const employee = await Employee.findById({_id: id})
        if (!employee) {
            return res.status(404).json({sucess: false, error: "Employee not found"})
        }
        const user = await User.findById({_id: employee.userId})
        if (!user) {
            return res.status(404).json({sucess: false, error: "User not found"})
        }

        const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
        const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {
            maritalStatus,
            designation,
            salary,
            department
        })

        if (!updateEmployee || !updateUser){
            return res.status(404).json({success: false, error: "Server error while updating data"})
        }

        return res.status(200).json({success: true, message: "Employee data updated"})

    }catch(error) {
        return res.status(500).json({success: false, error: "server error! can't get employees!!"})
    }
}

const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;

  try {

    const employees = await Employee.find({
      department: id,
    })
      .populate("userId", "name email profileImage")
      .populate("department", "dept_name");

    return res.status(200).json({
      success: true,
      employees,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Unable to fetch employees.",
    });

  }
};

const terminateEmployee = async (req, res) => {

    try {

        const { id } = req.params;

        const { reason } = req.body;

        const employee = await Employee.findById(id);

        if (!employee) {

            return res.status(404).json({
                success: false,
                error: "Employee not found"
            });

        }

        if (employee.status === "Terminated") {

            return res.status(400).json({
                success: false,
                error: "Employee is already terminated."
            });

        }

        employee.status = "Terminated";

        employee.terminatedAt = new Date();

        employee.terminationReason = reason || "";

        await employee.save();

        return res.status(200).json({

            success: true,

            message: "Employee terminated successfully."

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            error: "Unable to terminate employee."

        });

    }

}

const reallocateEmployee = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            department,
            designation
        } = req.body;

        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                error: "Employee not found"
            });
        }

        employee.department = department;
        employee.designation = designation;

        await employee.save();

        return res.status(200).json({
            success: true,
            message: "Employee reallocated successfully."
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            error: "Server Error"
        });

    }
}

export { 
    addEmployee, 
    upload, 
    getEmployees, 
    fetchEmployee, 
    updateEmployee, 
    fetchEmployeesByDepId, 
    terminateEmployee,
    reallocateEmployee
 }