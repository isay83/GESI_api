import { Request, Response } from 'express'
import { University } from "../entities/University"

export const createUniversity = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, contact_email, contact_phone } = req.body

        const entity = new University()
        entity.name = name
        entity.contact_email = contact_email
        entity.contact_phone = contact_phone

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getUniversities = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await University.find()

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const updateUniversity = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await University.findOneBy({ university_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "University not found" })

        await University.update({ university_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const deleteUniversity = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await University.delete({ university_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "University not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getUniversity = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await University.findOne({
            where: { university_id: parseInt(id) }
        })

        if (!entity) {
            return res.status(404).json({ message: "University not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}