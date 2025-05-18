import { Router } from 'express'
import { createZone, getZones, updateZone, deleteZone, getZone } from '../controllers/zone.controllers'

const router = Router()
// Create
router.post("/zone", createZone)
// Get all
router.get("/zone", getZones)
// Update
router.put("/zone/:id", updateZone)
// Delete
router.delete("/zone/:id", deleteZone)
// Get by id
router.get("/zone/:id", getZone)

export default router