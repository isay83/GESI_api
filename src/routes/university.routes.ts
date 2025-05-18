import { Router } from 'express'
import { createUniversity, getUniversities, updateUniversity, deleteUniversity, getUniversity } from '../controllers/university.controllers'

const router = Router()
// Create
router.post("/university", createUniversity)
// Get all
router.get("/university", getUniversities)
// Update
router.put("/university/:id", updateUniversity)
// Delete
router.delete("/university/:id", deleteUniversity)
// Get by id
router.get("/university/:id", getUniversity)

export default router