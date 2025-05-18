import { Request, Response } from 'express'
import { Role } from '../entities/Role'

export const createRole = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name } = req.body

        const entity = new Role()
        entity.name = name

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }

    }
}

export const getRoles = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await Role.find()

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const updateRole = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await Role.findOneBy({ role_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "Role not found" })

        await Role.update({ role_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const deleteRole = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await Role.delete({ role_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "Role not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const getRole = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await Role.findOne({
            where: { role_id: parseInt(id) }
        })

        if (!entity) {
            return res.status(404).json({ message: "Role not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}