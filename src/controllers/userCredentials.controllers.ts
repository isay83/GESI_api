import { Request, Response } from 'express'
import { UserCredentials } from "../entities/UserCredentials"
import { User } from '../entities/User'

export const createUserCredentials = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user_id, password_hash, salt } = req.body

        const user = await User.findOneBy({ user_id: parseInt(user_id) })
        if (!user) return res.status(404).json({ message: "User not found" })

        const entity = new UserCredentials()
        entity.user_id = parseInt(user_id)
        entity.password_hash = password_hash
        entity.salt = salt

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getUserCredentials = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await UserCredentials.find({
            relations: ['user']
        })

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const updateUserCredentials = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await UserCredentials.findOneBy({ credential_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "User Credentials not found" })

        if (req.body.user_id) {
            const user = await User.findOneBy({ user_id: parseInt(req.body.user_id) })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
        }

        await UserCredentials.update({ credential_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const deleteUserCredentials = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await UserCredentials.delete({ credential_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "User Credentials not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getUserCredential = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await UserCredentials.findOne({
            where: { credential_id: parseInt(id) },
            relations: ['user']
        })

        if (!entity) {
            return res.status(404).json({ message: "User Credentials not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}