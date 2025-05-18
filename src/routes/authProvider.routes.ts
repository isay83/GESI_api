import { Router } from 'express'
import { createAuthProvider, getAuthProviders, updateAuthProvider, deleteAuthProvider, getAuthProvider } from '../controllers/authProvider.controllers'

const router = Router()
// Create
router.post("/authProvider", createAuthProvider)
// Get all
router.get("/authProvider", getAuthProviders)
// Update
router.put("/authProvider/:id", updateAuthProvider)
// Delete
router.delete("/authProvider/:id", deleteAuthProvider)
// Get by id
router.get("/authProvider/:id", getAuthProvider)

export default router