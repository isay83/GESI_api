import { Request, Response } from 'express'
import { ParkingSession } from "../entities/ParkingSession"
import { ParkingSpace } from '../entities/ParkingSpace'
import { LicensePlate } from '../entities/LicensePlate'

export const createParkingSession = async (req: Request, res: Response): Promise<any> => {
    try {
        const { parking_space_id, license_plate_id, entry_time, exit_time, status } = req.body

        const parkingSpace = await ParkingSpace.findOneBy({ parking_space_id: parseInt(parking_space_id) })
        if (!parkingSpace) return res.status(404).json({ message: "ParkingSpace not found" })

        const licensePlate = await LicensePlate.findOneBy({ license_plate_id: parseInt(license_plate_id) })
        if (!licensePlate) return res.status(404).json({ message: "LicensePlate not found" })

        const entity = new ParkingSession()
        entity.parking_space_id = parseInt(parking_space_id)
        entity.license_plate_id = parseInt(license_plate_id)
        entity.entry_time = new Date(entry_time)
        if (exit_time) entity.exit_time = new Date(exit_time)
        if (status) entity.status = status

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getParkingSessions = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await ParkingSession.find({
            relations: ['parkingSpace', 'licensePlate'],
        })

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const updateParkingSession = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await ParkingSession.findOneBy({ session_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "Access Permission not found" })

        if (req.body.parking_space_id) {
            const parkingSpace = await ParkingSpace.findOneBy({ parking_space_id: parseInt(req.body.parking_space_id) })
            if (!parkingSpace) {
                return res.status(404).json({ message: "ParkingSpace not found" })
            }
        }

        if (req.body.license_plate_id) {
            const licensePlate = await LicensePlate.findOneBy({ license_plate_id: parseInt(req.body.license_plate_id) })
            if (!licensePlate) {
                return res.status(404).json({ message: "LicensePlate not found" })
            }
        }

        if (req.body.exit_time) req.body.exit_time = new Date(req.body.exit_time)

        if (req.body.status) req.body.status = new Date(req.body.status)

        await ParkingSession.update({ session_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const deleteParkingSession = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await ParkingSession.delete({ session_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "Parking Session not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getParkingSession = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await ParkingSession.findOne({
            where: { session_id: parseInt(id) },
            relations: ['parkingSpace', 'licensePlate'],
        })

        if (!entity) {
            return res.status(404).json({ message: "Parking Session not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}