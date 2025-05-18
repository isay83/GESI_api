import { Request, Response } from 'express'
import { Campus } from '../entities/Campus'
import { University } from '../entities/University'

export const createCampus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, address, university_id } = req.body

        const university = await University.findOneBy({ university_id: parseInt(university_id) })
        if (!university) return res.status(404).json({ message: "University not found" })

        const entity = new Campus()
        entity.name = name
        entity.address = address
        entity.university_id = parseInt(university_id)

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }

    }
}

export const getCampuses = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await Campus.find({
            relations: ['university']
        })

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const updateCampus = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await Campus.findOneBy({ campus_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "Campus not found" })

        if (req.body.university_id) {
            const user = await University.findOneBy({ university_id: parseInt(req.body.university_id) })
            if (!user) {
                return res.status(404).json({ message: "University not found" })
            }
        }

        await Campus.update({ campus_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const deleteCampus = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await Campus.delete({ campus_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "Campus not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const getCampus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await Campus.findOne({
            where: { campus_id: parseInt(id) },
            relations: ['university']
        })

        if (!entity) {
            return res.status(404).json({ message: "Campus not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}