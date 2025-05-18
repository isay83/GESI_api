import { Request, Response } from 'express'
import { ParkingPreference } from "../entities/ParkingPreference"
import { User } from '../entities/User'
import { Zone } from '../entities/Zone'

export const createParkingPreference = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user_id, zone_id, start_time, end_time } = req.body

        const user = await User.findOneBy({ user_id: parseInt(user_id) })
        if (!user) return res.status(404).json({ message: "User not found" })

        const zone = await Zone.findOneBy({ zone_id: parseInt(zone_id) })
        if (!zone) return res.status(404).json({ message: "Zone not found" })

        const entity = new ParkingPreference()
        entity.user_id = parseInt(user_id)
        entity.zone_id = parseInt(zone_id)
        if (start_time) entity.start_time = new Date(start_time)
        if (end_time) entity.end_time = new Date(end_time)

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }

    }
}

export const getParkingPreferences = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await ParkingPreference.find({
            relations: ['user', 'zone'],
        })

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const updateParkingPreference = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await ParkingPreference.findOneBy({ preference_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "Parking Preference not found" })

        if (req.body.user_id) {
            const user = await User.findOneBy({ user_id: parseInt(req.body.user_id) })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
        }

        if (req.body.zone_id) {
            const zone = await Zone.findOneBy({ zone_id: parseInt(req.body.zone_id) })
            if (!zone) {
                return res.status(404).json({ message: "Zone not found" })
            }
        }

        await ParkingPreference.update({ preference_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const deleteParkingPreference = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await ParkingPreference.delete({ preference_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "Parking Preference not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const getParkingPreference = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await ParkingPreference.findOne({
            where: { preference_id: parseInt(id) },
            relations: ['user', 'zone'],
        })

        if (!entity) {
            return res.status(404).json({ message: "Parking Preference not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}