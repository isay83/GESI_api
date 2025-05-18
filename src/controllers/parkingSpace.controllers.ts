import { Request, Response } from 'express'
import { ParkingSpace } from "../entities/ParkingSpace"
import { Zone } from '../entities/Zone'

export const createParkingSpace = async (req: Request, res: Response): Promise<any> => {
    try {
        const { number, status, zone_id } = req.body

        const zone = await Zone.findOneBy({ zone_id: parseInt(zone_id) })
        if (!zone) return res.status(404).json({ message: "Zone not found" })

        const entity = new ParkingSpace()
        entity.number = number
        entity.status = status
        entity.zone_id = parseInt(zone_id)

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getParkingSpaces = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await ParkingSpace.find({
            relations: ['zone']
        })

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const updateParkingSpace = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await ParkingSpace.findOneBy({ parking_space_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "Parking Space not found" })

        if (req.body.zone_id) {
            const zone = await Zone.findOneBy({ zone_id: parseInt(req.body.zone_id) })
            if (!zone) {
                return res.status(404).json({ message: "Zone not found" })
            }
        }

        await ParkingSpace.update({ parking_space_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const deleteParkingSpace = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await ParkingSpace.delete({ parking_space_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "Parking Space not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getParkingSpace = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await ParkingSpace.findOne({
            where: { parking_space_id: parseInt(id) },
            relations: ['zone']
        })

        if (!entity) {
            return res.status(404).json({ message: "Parking Space not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}