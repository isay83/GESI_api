import { Request, Response } from 'express'
import { AccessPermission } from "../entities/AccessPermission"
import { User } from '../entities/User'
import { Campus } from '../entities/Campus'

export const createAccessPermission = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user_id, campus_id, start_date, end_date } = req.body

        const user = await User.findOneBy({ user_id: parseInt(user_id) })
        if (!user) return res.status(404).json({ message: "User not found" })

        const campus = await Campus.findOneBy({ campus_id: parseInt(campus_id) })
        if (!campus) return res.status(404).json({ message: "Campus not found" })

        const entity = new AccessPermission()
        entity.user_id = parseInt(user_id)
        entity.campus_id = parseInt(campus_id)
        entity.start_date = new Date(start_date)
        if (end_date) entity.end_date = new Date(end_date)

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getAccessPermissions = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await AccessPermission.find({
            relations: ['user', 'campus']
        })

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const updateAccessPermission = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await AccessPermission.findOneBy({ access_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "Access Permission not found" })

        if (req.body.user_id) {
            const user = await User.findOneBy({ user_id: parseInt(req.body.user_id) })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
        }

        if (req.body.campus_id) {
            const campus = await Campus.findOneBy({ campus_id: parseInt(req.body.campus_id) })
            if (!campus) {
                return res.status(404).json({ message: "Campus not found" })
            }
        }

        if (req.body.start_date) {
            req.body.start_date = new Date(req.body.start_date)
        }

        if (req.body.end_date) {
            req.body.end_date = new Date(req.body.end_date)
        }

        await AccessPermission.update({ access_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const deleteAccessPermission = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await AccessPermission.delete({ access_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "Access Permission not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getAccessPermission = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await AccessPermission.findOne({
            where: { access_id: parseInt(id) },
            relations: ['user', 'campus']
        })

        if (!entity) {
            return res.status(404).json({ message: "Access Permission not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}