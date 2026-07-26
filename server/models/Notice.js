import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    notice_name: {type: String, required: true},
    notice_desc: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const Notice = new mongoose.model("Notice", noticeSchema)

export default Notice;