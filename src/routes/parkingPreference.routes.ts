import { Router } from 'express'
import { createParkingPreference, getParkingPreferences, updateParkingPreference, deleteParkingPreference, getParkingPreference } from '../controllers/parkingPreference.controllers'

const router = Router()
// Create
router.post("/parkingPreference", createParkingPreference)
// Get all
router.get("/parkingPreference", getParkingPreferences)
// Update
router.put("/parkingPreference/:id", updateParkingPreference)
// Delete
router.delete("/parkingPreference/:id", deleteParkingPreference)
// Get by id
router.get("/parkingPreference/:id", getParkingPreference)

export default router