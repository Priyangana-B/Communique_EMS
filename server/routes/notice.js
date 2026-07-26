import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addNotices, getNotices, deleteNotice } from '../controllers/noticeController.js'

const router = express.Router()

router.get("/", authMiddleware, getNotices)
router.post("/add", authMiddleware, addNotices)
router.delete("/:id", authMiddleware, deleteNotice);

export default router