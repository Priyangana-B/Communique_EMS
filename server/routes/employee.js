import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addEmployee, upload, getEmployees, fetchEmployee, updateEmployee, fetchEmployeesByDepId, terminateEmployee, reallocateEmployee } from '../controllers/employeeController.js'

const router = express.Router()

router.get("/", authMiddleware, getEmployees)
router.post("/add", authMiddleware, upload.single('image'), addEmployee)
router.get("/department/:id", authMiddleware, fetchEmployeesByDepId)
router.patch("/terminate/:id", authMiddleware, terminateEmployee);
router.get("/:id", authMiddleware, fetchEmployee)
router.put("/:id", authMiddleware, updateEmployee)
router.put("/reallocate/:id", authMiddleware, reallocateEmployee);


export default router