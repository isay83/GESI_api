import { Router } from 'express'
import { createParkingSession, getParkingSessions, updateParkingSession, deleteParkingSession, getParkingSession } from '../controllers/parkingSession.controllers'

const router = Router()
// Create
router.post("/parkingSession", createParkingSession)
// Get all
router.get("/parkingSession", getParkingSessions)
// Update
router.put("/parkingSession/:id", updateParkingSession)
// Delete
router.delete("/parkingSession/:id", deleteParkingSession)
// Get by id
router.get("/parkingSession/:id", getParkingSession)

export default router