import { Request, Response } from "express"
import { addVehicleDB, deleteVehicleDB, editVehicleDB, getVehicleDB, getVehiclesDB } from "../Entities/vehicle"
import { vehicle } from "../TypeDef/vehicle"
import checkNumber from "../Lib/checkNumberType"

export const index = async (req: Request,res: Response) => {

    try {
        res.status(200).json("Hello from vehicle Controller")
    }
    catch (error) {
        res.status(500).json(error)
    }
}

// to get all vehicle
export const listOfVehicle = async (req: Request,res: Response) => {
    try {
        // need to put [] for type because of array
        const vehicles: vehicle[] | null = await getVehiclesDB()
        if (!vehicles) { throw new Error("No vehicles found") }
        
        res.status(200).json(vehicles)
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ ok: false, message: error.message })
        } else {
            res.status(500).json({ ok: false, message: error })
        }
    }
}

export const singleVehicle = async (req: Request, res: Response) => {

    try {

        const { id } = req.params
        // to check if the id is a number
        if (checkNumber(id)) throw new Error("Invalid id input")


        const vehicle: vehicle | null = await getVehicleDB(Number(id))
        if (!vehicle) { throw new Error("No vehicle found with that id") }
        
        res.status(200).json(vehicle)
        
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ ok: false, message: error.message })
        } else {
            res.status(500).json({ ok: false, message: error })
        }
    }
}

export const addVehicle = async (req: Request, res: Response) => {

    try {
        // const { name, type, colour } = req.body
        const addVeh = await addVehicleDB(req.body)
        if (!addVeh) { throw new Error("error during adding the vehicle") }
        
        res.status(200).json({ ok: true, message: "Car was added succesfully", data: addVeh })
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ ok: false, message: error.message })
        } else {
            res.status(500).json({ ok: false, message: error })
        }
    }
}

export const updateVehicle = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        // to check if the id is a number
        if (checkNumber(id)) throw new Error("Invalid id input")

        const editVeh = await editVehicleDB(req.body, Number(id))
        if (!editVeh) { throw new Error("error during updating the vehicle") }

        // const vehicle: vehicle | null = await getVehicleDB(Number(id))
        // if (!vehicle) { throw new Error("No vehicle found with that id") }
        
        res.status(200).json({ ok: true, message: "Car was updated succesfully", data: editVeh})
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ ok: false, message: error.message })
        } else {
            res.status(500).json({ ok: false, message: error })
        }
    }
}

export const deleteVehicle = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        // to check if the id is a number
        if (checkNumber(id)) throw new Error("Invalid id input")

        const deleteVeh = await deleteVehicleDB(Number(id))
        if (!deleteVeh) { throw new Error("error during deleting the vehicle") }

        res.status(200).json({ ok: true, message: "Car was deleted succesfully", data: deleteVeh})
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ ok: false, message: error.message })
        } else {
            res.status(500).json({ ok: false, message: error })
        }
    }
}
