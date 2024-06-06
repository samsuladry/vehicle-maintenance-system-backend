import { PrismaClient } from '@prisma/client'
import { maintenance } from '../TypeDef/maintenance';
import { vehicle } from './../TypeDef/vehicle.d';
import { getVehicleDB } from './vehicle';

const prisma = new PrismaClient()

// To get all maintenance from db
export const getListOfMaintenanceDB = async () =>
{
    try
    {
        const maintenance = await prisma.maintenance.findMany()
        if (!maintenance) throw new Error;

        return maintenance
    }
    catch(error)
    {
        return null
    }
}

// To get a maintenance using id from db
export const getMaintenanceDB = async (id: number) =>
{
    try
    {
        const maintenance = await prisma.maintenance.findFirst({
            where: {
                id
            }
        })
        if (!maintenance) throw new Error;

        return maintenance
    }
    catch(error)
    {
        return null
    }
}

export const addMaintenanceDB = async ({ vehicleId }: maintenance) => {

    try {
        const vehicle = await getVehicleDB(Number(vehicleId))
        if (!vehicle) { throw new Error }

        // check if there any other running maintenance
        const checkMain = await prisma.maintenance.findFirst({
            where:{
                vehicleId
            },
            orderBy:{
                updatedAt: "desc"
            }
        })
        if (checkMain && checkMain.status && checkMain.status.toLocaleLowerCase() !== "done") { throw new Error ("There is record on going maintenance for this vehicle") }
        
        const addVehicleToMaintenanceList = await prisma.maintenance.create({
            data: {
                status: "inspection",
                vehicleId
            }
        })

        return addVehicleToMaintenanceList
    } catch (error) {
        
        return null
    }
}

export const editMaintenanceDB = async (data: maintenance, id: number) => {

    try {
        // want to check if the status is done, if done, then the user can add a new maintenance record
        const checkMain = await prisma.maintenance.findFirst({
            where:{
                id
            },
            orderBy:{
                updatedAt: "desc"
            }
        })

        if (checkMain && checkMain.status && checkMain.status.toLowerCase() === "done") { throw new Error ("Cannot update the status of this maintenance, please add a new one.") }
        const editVehicleToMaintenanceList = await prisma.maintenance.update({
            where: {
                id
            },
            data
        })

        return editVehicleToMaintenanceList
    } catch (error) {
        return null
    }
}

export const deleteMaintenanceDB = async (id: number) => {

    try {
        const deleteMaintenance = await prisma.maintenance.delete({
            where: {
                id
            }
        })

        return deleteMaintenance
    } catch (error) {
        return null
    }
}