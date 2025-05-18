import { Router } from 'express'
import { createParkingSpace, getParkingSpaces, updateParkingSpace, deleteParkingSpace, getParkingSpace } from '../controllers/parkingSpace.controllers'

const router = Router()
// Create
router.post("/parkingSpace", createParkingSpace)
// Get all
router.get("/parkingSpace", getParkingSpaces)
// Update
router.put("/parkingSpace/:id", updateParkingSpace)
// Delete
router.delete("/parkingSpace/:id", deleteParkingSpace)
// Get by id
router.get("/parkingSpace/:id", getParkingSpace)

export default router