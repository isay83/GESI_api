import { Router } from 'express'
import { createCampus, getCampuses, updateCampus, deleteCampus, getCampus } from '../controllers/campus.controllers'

const router = Router()
// Create
router.post("/campus", createCampus)
// Get all
router.get("/campus", getCampuses)
// Update
router.put("/campus/:id", updateCampus)
// Delete
router.delete("/campus/:id", deleteCampus)
// Get by id
router.get("/campus/:id", getCampus)

export default router