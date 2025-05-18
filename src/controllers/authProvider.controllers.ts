import { Request, Response } from 'express'
import { AuthProvider } from "../entities/AuthProvider"

export const createAuthProvider = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, active } = req.body

        const entity = new AuthProvider()
        entity.name = name
        entity.active = active

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }

    }
}

export const getAuthProviders = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await AuthProvider.find()

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const updateAuthProvider = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await AuthProvider.findOneBy({ provider_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "Auth provider not found" })

        await AuthProvider.update({ provider_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const deleteAuthProvider = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await AuthProvider.delete({ provider_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "Auth provider not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const getAuthProvider = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await AuthProvider.findOne({
            where: { provider_id: parseInt(id) }
        })

        if (!entity) {
            return res.status(404).json({ message: "Auth provider not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}