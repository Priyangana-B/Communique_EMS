import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addSalary, getSalary } from '../controllers/salaryController.js'
import { addLeave, getLeaves, fetchLeaves, getLeaveDetail, updateLeaves } from '../controllers/leaveController.js'

const router = express.Router()

router.post("/add", authMiddleware, addLeave)
router.get("/:id", authMiddleware, getLeaves)
router.put("/:id", authMiddleware, updateLeaves)
router.get("/detail/:id", authMiddleware, getLeaveDetail)
router.get('/', authMiddleware, fetchLeaves)

export default router