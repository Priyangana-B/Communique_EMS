import Leave from '../models/Leave.js'
import Employee from '../models/Employee.js'

const addLeave = async (req,res) => {
    try{
        const {
            userId, 
            leaveType, 
            startDate, 
            endDate, 
            reason
        } = req.body

        const employee = await Employee.findOne({userId})

        const newLeave = new Leave ({
            employeeId: employee._id, 
            leaveType, 
            startDate, 
            endDate, 
            reason
        })

        await newLeave.save()

        return res.status(200).json({success: true})

    }catch(error){
        console.log(error.message)
        return res.status(500).json({success: false, error: "leave can't be applied"+error})

    }
}

const getLeaves = async (req, res) => {
    try{
        const {id} = req.params;
        let leaves = await Leave.find({employeeId: id})
        if(leaves.length === 0) {
            const employee = await Employee.findOne({userId: id})

            if(!employee) {
                return res.status(404).json({success: false, error: "Employee not found"})
            }
            leaves = await Leave.find({employeeId: employee._id})
        }
        
        return res.status(200).json({success: true, leaves})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success: false, error: "leave can't be applied"+error})

    }
}

const fetchLeaves = async (req, res) => {
   try{
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'dept_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
            ]
        })
        return res.status(200).json({success: true, leaves})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success: false, error: "leave can't be applied"+error})
    }
} 

const getLeaveDetail = async (req, res) => {
    try{
        const {id} = req.params;
        const leave = await Leave.findById({_id: id}).populate({
            path: "employeeId",
            populate: [
                {
                    path: 'department',
                    select: 'dept_name'
                },
                {
                    path: 'userId',
                    select: 'name email profileImage'
                }
            ]
        })
        return res.status(200).json({success: true, leave})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success: false, error: "leave can't be applied"+error})
    }
}


const updateLeaves = async (req,res) => {
    try{
        const {id} = req.params;
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
        if(!leave){
            return res.status(404).json({success: false, error: "Leave not found"})
        }
        return res.status(200).json({success: true})
    }catch(error){
        console.log(error.message)
        return res.status(500).json({success: false, error: "leave can't be applied"+error})
    }
}

export {addLeave, getLeaves, fetchLeaves, getLeaveDetail, updateLeaves}