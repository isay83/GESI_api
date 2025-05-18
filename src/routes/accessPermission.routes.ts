import { Router } from 'express'
import { createAccessPermission, getAccessPermissions, updateAccessPermission, deleteAccessPermission, getAccessPermission } from '../controllers/accessPermission.controllers'

const router = Router()
// Create
router.post("/accessPermissions", createAccessPermission)
// Get all
router.get("/accessPermissions", getAccessPermissions)
// Update
router.put("/accessPermissions/:id", updateAccessPermission)
// Delete
router.delete("/accessPermissions/:id", deleteAccessPermission)
// Get by id
router.get("/accessPermissions/:id", getAccessPermission)

export default router