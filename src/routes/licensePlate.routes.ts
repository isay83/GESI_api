import { Router } from 'express'
import { createLicensePlate, getLicensePlates, updateLicensePlate, deleteLicensePlate, getLicensePlate } from '../controllers/licensePlate.controllers'

const router = Router()
// Create
router.post("/licensePlate", createLicensePlate)
// Get all
router.get("/licensePlate", getLicensePlates)
// Update
router.put("/licensePlate/:id", updateLicensePlate)
// Delete
router.delete("/licensePlate/:id", deleteLicensePlate)
// Get by id
router.get("/licensePlate/:id", getLicensePlate)

export default router