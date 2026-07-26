import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    dept_name: {type: String, required: true},
    dept_desc: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const Department = new mongoose.model("Department", departmentSchema)

export default Department;