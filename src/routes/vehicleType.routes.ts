import { Router } from 'express'
import { createVehicleType, getVehicleTypes, updateVehicleType, deleteVehicleType, getVehicleType } from '../controllers/vehicleType.controllers'

const router = Router()
// Create
router.post("/vehicleType", createVehicleType)
// Get all
router.get("/vehicleType", getVehicleTypes)
// Update
router.put("/vehicleType/:id", updateVehicleType)
// Delete
router.delete("/vehicleType/:id", deleteVehicleType)
// Get by id
router.get("/vehicleType/:id", getVehicleType)

export default router