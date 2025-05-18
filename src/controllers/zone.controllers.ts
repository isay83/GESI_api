import { Request, Response } from 'express'
import { Zone } from "../entities/Zone"
import { Campus } from '../entities/Campus'

export const createZone = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description, campus_id } = req.body

        const campus = await Campus.findOneBy({ campus_id: parseInt(campus_id) })
        if (!campus) return res.status(404).json({ message: "Campus not found" })

        const entity = new Zone()
        entity.name = name
        entity.description = description
        entity.campus_id = parseInt(campus_id)

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getZones = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await Zone.find({
            relations: ['campus']
        })

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const updateZone = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await Zone.findOneBy({ zone_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "Zone not found" })

        if (req.body.campus_id) {
            const campus = await Campus.findOneBy({ campus_id: parseInt(req.body.campus_id) })
            if (!campus) {
                return res.status(404).json({ message: "Campus not found" })
            }
        }

        await Zone.update({ zone_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const deleteZone = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await Zone.delete({ zone_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "Zone not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getZone = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await Zone.findOne({
            where: { zone_id: parseInt(id) },
            relations: ['campus']
        })

        if (!entity) {
            return res.status(404).json({ message: "Zone not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}