import { Router } from 'express'
import { createUserCredentials, getUserCredentials, updateUserCredentials, deleteUserCredentials, getUserCredential } from '../controllers/userCredentials.controllers'

const router = Router()
// Create
router.post("/userCredentials", createUserCredentials)
// Get all
router.get("/userCredentials", getUserCredentials)
// Update
router.put("/userCredentials/:id", updateUserCredentials)
// Delete
router.delete("/userCredentials/:id", deleteUserCredentials)
// Get by id
router.get("/userCredentials/:id", getUserCredential)

export default router