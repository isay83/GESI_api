import { Request, Response } from 'express'
import { LicensePlate } from "../entities/LicensePlate"
import { User } from '../entities/User'
import { VehicleType } from '../entities/VehicleType'

export const createLicensePlate = async (req: Request, res: Response): Promise<any> => {
    try {
        const { plate_number, user_id, vehicle_type_id } = req.body

        const user = await User.findOneBy({ user_id: parseInt(user_id) })
        if (!user) return res.status(404).json({ message: "User not found" })

        const vehicleType = await VehicleType.findOneBy({ vehicle_type_id: parseInt(vehicle_type_id) })
        if (!vehicleType) return res.status(404).json({ message: "Vehicle Type not found" })

        const entity = new LicensePlate()
        entity.plate_number = plate_number.toUpperCase()
        entity.user_id = parseInt(user_id)
        entity.vehicle_type_id = parseInt(vehicle_type_id)

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }

    }
}

export const getLicensePlates = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await LicensePlate.find({
            relations: ['user', 'vehicleType'],
        })

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const updateLicensePlate = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await LicensePlate.findOneBy({ license_plate_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "License Plate not found" })

        if (req.body.user_id) {
            const user = await User.findOneBy({ user_id: parseInt(req.body.user_id) })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
        }

        if (req.body.vehicle_type_id) {
            const vehicleType = await VehicleType.findOneBy({ vehicle_type_id: parseInt(req.body.vehicle_type_id) })
            if (!vehicleType) {
                return res.status(404).json({ message: "Vehicle Type not found" })
            }
        }

        await LicensePlate.update({ license_plate_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const deleteLicensePlate = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await LicensePlate.delete({ license_plate_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "License Plate not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const getLicensePlate = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await LicensePlate.findOne({
            where: { license_plate_id: parseInt(id) },
            relations: ['user', 'vehicleType'],
        })

        if (!entity) {
            return res.status(404).json({ message: "License Plate not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}