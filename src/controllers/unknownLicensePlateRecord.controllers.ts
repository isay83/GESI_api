import { Request, Response } from 'express'
import { UnknownLicensePlateRecord } from "../entities/UnknownLicensePlateRecord"
import { Campus } from '../entities/Campus'

export const createUnknownLicensePlateRecord = async (req: Request, res: Response): Promise<any> => {
    try {
        const { plate_number, timestamp, image_url, campus_id } = req.body

        const campus = await Campus.findOneBy({ campus_id: parseInt(campus_id) })
        if (!campus) return res.status(404).json({ message: "Campus not found" })

        const entity = new UnknownLicensePlateRecord()
        entity.plate_number = plate_number
        entity.timestamp = new Date(timestamp)
        entity.image_url = image_url
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

export const getUnknownLicensePlateRecords = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await UnknownLicensePlateRecord.find({
            relations: ['campus'],
        })

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const updateUnknownLicensePlateRecord = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await UnknownLicensePlateRecord.findOneBy({ record_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "UnknownLicensePlateRecord not found" })


        if (req.body.campus_id) {
            const campus = await Campus.findOneBy({ campus_id: parseInt(req.body.campus_id) })
            if (!campus) {
                return res.status(404).json({ message: "Campus not found" })
            }
        }

        await UnknownLicensePlateRecord.update({ record_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const deleteUnknownLicensePlateRecord = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await UnknownLicensePlateRecord.delete({ record_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "UnknownLicensePlateRecord not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getUnknownLicensePlateRecord = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await UnknownLicensePlateRecord.findOne({
            where: { record_id: parseInt(id) },
            relations: ['campus']
        })

        if (!entity) {
            return res.status(404).json({ message: "UnknownLicensePlateRecord not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}