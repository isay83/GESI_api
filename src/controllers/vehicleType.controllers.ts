import { Request, Response } from 'express'
import { VehicleType } from "../entities/VehicleType"

export const createVehicleType = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description } = req.body

        const entity = new VehicleType()
        entity.name = name
        entity.description = description

        await entity.save()

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getVehicleTypes = async (req: Request, res: Response): Promise<any> => {
    try {
        const entities = await VehicleType.find()

        return res.json(entities)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const updateVehicleType = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    try {
        const entity = await VehicleType.findOneBy({ vehicle_type_id: parseInt(id) })

        if (!entity) return res.status(404).json({ message: "Vehicle Type not found" })

        await VehicleType.update({ vehicle_type_id: parseInt(id) }, req.body)

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const deleteVehicleType = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    try {
        const result = await VehicleType.delete({ vehicle_type_id: parseInt(id) })

        if (result.affected === 0) {
            return res.status(404).json({ message: "Vehicle Type not found" })
        }

        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}

export const getVehicleType = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params

        const entity = await VehicleType.findOne({
            where: { vehicle_type_id: parseInt(id) }
        })

        if (!entity) {
            return res.status(404).json({ message: "Vehicle Type not found" })
        }

        return res.json(entity)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unknown error occurred" })
    }
}