import { Request, Response } from 'express'
import { ExternalUserAuthentication } from "../entities/ExternalUserAuthentication"
import { User } from '../entities/User'
import { AuthProvider } from '../entities/AuthProvider'


export const createExternalUserAuthentication = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user_id, provider_id, external_id, provider_email, refresh_token, access_token, linked_at, last_login } = req.body

        const user = await User.findOneBy({ user_id: parseInt(user_id) })
        if (!user) return res.status(404).json({ message: "User not found" })

        const authProvider = await AuthProvider.findOneBy({ provider_id: parseInt(provider_id) })
        if (!authProvider) return res.status(404).json({ message: "Provider not found" })

        const entity = new ExternalUserAuthentication()
        entity.user_id = parseInt(user_id)
        entity.provider_id = parseInt(provider_id)
        entity.external_id = external_id
        entity.provider_email = provider_email
        entity.refresh_token = refresh_token
        entity.access_token = access_token
        if (linked_at) entity.linked_at = new Date(linked_at)
        entity.last_login = new Date(last_login)

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }

    }
}

export const getExternalUserAuthentications = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await ExternalUserAuthentication.find({
            relations: ['user', 'authProvider']
        })

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const updateExternalUserAuthentication = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await ExternalUserAuthentication.findOneBy({ authentication_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "External Auth not found" })

        if (req.body.user_id) {
            const user = await User.findOneBy({ user_id: parseInt(req.body.user_id) })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
        }

        if (req.body.provider_id) {
            const campus = await AuthProvider.findOneBy({ provider_id: parseInt(req.body.provider_id) })
            if (!campus) {
                return res.status(404).json({ message: "Provider not found" })
            }
        }

        await ExternalUserAuthentication.update({ authentication_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const deleteExternalUserAuthentication = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await ExternalUserAuthentication.delete({ authentication_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "External Auth not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const getExternalUserAuthentication = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await ExternalUserAuthentication.findOne({
            where: { authentication_id: parseInt(id) },
            relations: ['user', 'authProvider']
        })

        if (!entity) {
            return res.status(404).json({ message: "External Auth not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}