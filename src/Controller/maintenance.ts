import { Request, Response } from "express"
import { vehicle } from "../TypeDef/vehicle"
import { addMaintenanceDB, deleteMaintenanceDB, editMaintenanceDB, getListOfMaintenanceDB, getMaintenanceDB } from "../Entities/maintenance"
import { maintenance } from "../TypeDef/maintenance"
import checkNumber from "../Lib/checkNumberType"

export const index = async (req: Request,res: Response) => {

    try {
        res.status(200).json("Hello from maintenance Controller")
    }
    catch (error) {
        res.status(500).json(error)
    }
}

// to get all vehicle
export const listOfMaintenance = async (req: Request,res: Response) => {
    try {
        // need to put [] for type because of array
        const maintenance: maintenance[] | null = await getListOfMaintenanceDB()
        if (!maintenance) { throw new Error("No maintenance service found") }
        
        res.status(200).json(maintenance)
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ ok: false,  message: error.message })
        } else {
            res.status(500).json({ ok: false,  message: error })
        }
    }
}

export const singleMaintenance = async (req: Request, res: Response) => {

    try {

        const { id } = req.params
        // to check if the id is a number
        if (checkNumber(id)) throw new Error("Invalid id input")


        const maintenance: maintenance | null = await getMaintenanceDB(Number(id))
        if (!maintenance) { throw new Error("No maintenance service found with that id") }
        
        res.status(200).json(maintenance)
        
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ ok: false,  message: error.message })
        } else {
            res.status(500).json({ ok: false,  message: error })
        }
    }
}

export const addMaintenance = async (req: Request, res: Response) => {

    try {
        // const { vehicleId, status } = req.body
        // if (checkNumber(vehicleId)) throw new Error("Invalid id input")
        const addVeh = await addMaintenanceDB(req.body)
        
        if (!addVeh) { throw new Error("error during adding the vehicle") }
        
        res.status(200).json({ ok: true, message: "Car was added succesfully to the maintenance list", data: addVeh })
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ ok: false,  message: error.message })
        } else {
            res.status(500).json({ ok: false,  message: error })
        }
    }
}

export const updateMaintenance = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        // to check if the id is a number
        if (checkNumber(id)) throw new Error("Invalid id input")

        const editMain = await editMaintenanceDB(req.body, Number(id))
        if (!editMain) { throw new Error("error during updating the maintenance service") }
        
        res.status(200).json({ ok: true, message: "Car was updated succesfully", data: editMain})
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ ok: false,  message: error.message })
        } else {
            res.status(500).json({ ok: false,  message: error })
        }
    }
}

export const deleteMaintenance = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        // to check if the id is a number
        if (checkNumber(id)) throw new Error("Invalid id input")

        const deleteMain = await deleteMaintenanceDB(Number(id))
        if (!deleteMain) { throw new Error("error during deleting the maintenance service") }

        res.status(200).json({ ok: true, message: "Maintenance service was deleted succesfully", data: deleteMain})
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ ok: false,  message: error.message })
        } else {
            res.status(500).json({ ok: false,  message: error })
        }
    }
}
