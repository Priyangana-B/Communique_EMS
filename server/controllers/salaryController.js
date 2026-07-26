import Salary from "../models/Salary.js"
import Employee from "../models/Employee.js"

const addSalary = async (req, res) => {
    try{
        const {
            employeeId, 
            basicSalary, 
            allowances, 
            deductions, 
            payDate
        } = req.body

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)

        const newSalary = new Salary ({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        })

        await newSalary.save()

        return res.status(200).json({success: true})

    }catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "salary can't be addded"})

    }
}

const getSalary = async (req, res) => {
    try{
        const {id} = req.params;
        let salary = await Salary.find({employeeId: id}).populate('employeeId', 'employeeId')
        
        if (salary.length === 0) {
    return res.status(200).json({
        success: true,
        salary: []
    });
}
        return res.status(200).json({success: true, salary})
    }catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "salary can't be addded"})

    }
}

export {addSalary, getSalary}