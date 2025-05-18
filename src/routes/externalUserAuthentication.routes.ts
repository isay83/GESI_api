import { Router } from 'express'
import { createExternalUserAuthentication, getExternalUserAuthentications, updateExternalUserAuthentication, deleteExternalUserAuthentication, getExternalUserAuthentication } from '../controllers/externalUserAuthentication.controllers'

const router = Router()
// Create
router.post("/externalUserAuthentication", createExternalUserAuthentication)
// Get all
router.get("/externalUserAuthentication", getExternalUserAuthentications)
// Update
router.put("/externalUserAuthentication/:id", updateExternalUserAuthentication)
// Delete
router.delete("/externalUserAuthentication/:id", deleteExternalUserAuthentication)
// Get by id
router.get("/externalUserAuthentication/:id", getExternalUserAuthentication)

export default router