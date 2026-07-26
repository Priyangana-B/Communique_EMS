import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
    try{
        const departments = await Department.find()
        return res.status(200).json({success: true, departments})
    }catch(error)
    {
       return res.status(500).json({success: false, error: "server error! can't get department!!"}) 
    }
}

const addDepartment = async (req, res) => {
    try{
        const {dept_name, dept_desc} = req.body;
        const newDepartment = new Department({
            dept_name,
            dept_desc
        })
        await newDepartment.save()
        return res.status(200).json({success: true, department: newDepartment})
    }catch (error){
        return res.status(500).json({success: false, error: "server error! can't add department!!"})
    }
}

const fetchDepartment = async (req, res) => {
    try{
        const {id} = req.params;
        const department = await Department.findById({_id: id})
       return res.status(200).json({success: true, department})
    }catch(error)
    {
       return res.status(500).json({success: false, error: "server error! can't get department!!"}) 
    }
}

const updateDepartment = async (req, res) => {
    try{
        const {id} = req.params;
        const {dept_name, dept_desc} = req.body;
        const updateDept = await Department.findByIdAndUpdate({_id: id}, {
            dept_name,
            dept_desc
        })
        return res.status(200).json({success: true, updateDept})
    }catch(error)
    {
       return res.status(500).json({success: false, error: "server error! can't edit department!!"}) 
    }
}

const deleteDepartment= async (req,res) => {
    try{
        const {id} = req.params;
        const deleteDept = await Department.findByIdAndDelete({_id: id})
        return res.status(200).json({success: true, deleteDept})
    }catch(error)
    {
       return res.status(500).json({success: false, error: "server error! can't delete department!!"}) 
    }
}

export {addDepartment, getDepartments, updateDepartment, fetchDepartment , deleteDepartment}