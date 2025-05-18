import { Router } from 'express'
import { createRole, getRoles, updateRole, deleteRole, getRole } from '../controllers/role.controllers'

const router = Router()
// Create
router.post("/role", createRole)
// Get all
router.get("/role", getRoles)
// Update
router.put("/role/:id", updateRole)
// Delete
router.delete("/role/:id", deleteRole)
// Get by id
router.get("/role/:id", getRole)

export default router