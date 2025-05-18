import { Router } from 'express'
import { createUnknownLicensePlateRecord, getUnknownLicensePlateRecords, updateUnknownLicensePlateRecord, deleteUnknownLicensePlateRecord, getUnknownLicensePlateRecord } from '../controllers/unknownLicensePlateRecord.controllers'

const router = Router()
// Create
router.post("/createUnknownLicensePlateRecord", createUnknownLicensePlateRecord)
// Get all
router.get("/createUnknownLicensePlateRecord", getUnknownLicensePlateRecords)
// Update
router.put("/createUnknownLicensePlateRecord/:id", updateUnknownLicensePlateRecord)
// Delete
router.delete("/createUnknownLicensePlateRecord/:id", deleteUnknownLicensePlateRecord)
// Get by id
router.get("/createUnknownLicensePlateRecord/:id", getUnknownLicensePlateRecord)

export default router