import { Request, Response } from 'express'
import { User } from '../entities/User'
import { Role } from '../entities/Role'
import { University } from '../entities/University'
import { UserCredentials } from '../entities/UserCredentials'

import { PasswordService } from '../services/password.services'

export const signupUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const {
            user_number,
            first_name,
            last_name,
            email,
            phone,
            role_id,
            university_id,
            active,
            password // Ahora también recibimos la contraseña
        } = req.body

        // Validación básica
        if (!password) {
            return res.status(400).json({ message: "Password is required" })
        }

        const role = await Role.findOneBy({ role_id: parseInt(role_id) })
        if (!role) return res.status(404).json({ message: "Role not found" })

        const university = await University.findOneBy({ university_id: parseInt(university_id) })
        if (!university) return res.status(404).json({ message: "University not found" })

        // Crear usuario
        const user = new User()
        if (user_number) user.user_number = user_number
        if (first_name) user.first_name = first_name
        if (last_name) user.last_name = last_name
        if (email) user.email = email
        if (phone) user.phone = phone
        user.role_id = parseInt(role_id)
        user.university_id = parseInt(university_id)
        if (active !== undefined) user.active = active

        // Guardar usuario
        const savedUser = await user.save()

        // Generar hash y salt para la contraseña
        const { passwordHash, salt } = PasswordService.hashPassword(password)

        // Crear las credenciales de usuario
        const userCredentials = new UserCredentials()
        userCredentials.user_id = savedUser.user_id
        userCredentials.password_hash = passwordHash
        userCredentials.salt = salt

        // Guardar credenciales
        await userCredentials.save()

        return res.status(201).json({
            ...savedUser,
            password: undefined // No devolvemos información sensible
        })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body

        // Validación básica
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        // Buscar usuario por email
        const user = await User.findOneBy({ email: email })
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        // Buscar credenciales del usuario
        const credentials = await UserCredentials.findOneBy({ user_id: user.user_id })
        if (!credentials) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        // Verificar contraseña
        const isPasswordValid = PasswordService.verifyPassword(
            password,
            credentials.password_hash,
            credentials.salt
        )

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        // Aquí se genera un token JWT o similar para la sesión

        return res.status(200).json({
            message: "Login successful",
            user: {
                user_id: user.user_id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role_id: user.role_id
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user_number, first_name, last_name, email, phone, role_id, university_id, active } = req.body

        const role = await Role.findOneBy({ role_id: parseInt(role_id) })
        if (!role) return res.status(404).json({ message: "Role not found" })

        const university = await University.findOneBy({ university_id: parseInt(university_id) })
        if (!university) return res.status(404).json({ message: "University not found" })

        const entity = new User()
        if (user_number) entity.user_number = user_number
        if (first_name) entity.first_name = first_name
        if (last_name) entity.last_name = last_name
        if (email) entity.email = email
        if (phone) entity.phone = phone
        entity.role_id = parseInt(role_id)
        entity.university_id = parseInt(university_id)
        if (active !== undefined) entity.active = active

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await User.find({
            relations: ['role', 'university']
        })

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await User.findOneBy({ user_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "User not found" })

        if (req.body.role_id) {
            const role = await Role.findOneBy({ role_id: parseInt(req.body.role_id) })
            if (!role) {
                return res.status(404).json({ message: "Role not found" })
            }
        }

        if (req.body.university_id) {
            const university = await University.findOneBy({ university_id: parseInt(req.body.university_id) })
            if (!university) {
                return res.status(404).json({ message: "University not found" })
            }
        }

        await User.update({ user_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await User.delete({ user_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await User.findOne({
            where: { user_id: parseInt(id) },
            relations: ['role', 'university']
        })

        if (!entity) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}