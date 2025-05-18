import { Router } from 'express'
import { createUser, getUsers, updateUser, deleteUser, getUser, signupUser, loginUser } from '../controllers/user.controllers'

const router = Router()
// Create
router.post("/user", createUser)
// Get all
router.get("/user", getUsers)
// Update
router.put("/user/:id", updateUser)
// Delete
router.delete("/user/:id", deleteUser)
// Get by id
router.get("/user/:id", getUser)

// Account

// Signup
router.post("/signup", signupUser)
// Login
router.post("/login", loginUser)

export default router