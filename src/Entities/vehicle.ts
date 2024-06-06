import { PrismaClient } from '@prisma/client'
import { vehicle } from '../TypeDef/vehicle';

const prisma = new PrismaClient()

// To get all vehicle from db
export const getVehiclesDB = async () =>
{
    try
    {
        const vehicles = await prisma.vehicle.findMany()
        if (!vehicles) throw new Error;

        return vehicles
    }
    catch(error)
    {
        return null
    }
}

// To get a vehicle using id from db
export const getVehicleDB = async (id: number) =>
{
    try
    {
        const vehicle = await prisma.vehicle.findFirst({
            where: {
                id
            }
        })
        if (!vehicle) throw new Error;

        return vehicle
    }
    catch(error)
    {
        return null
    }
}

export const addVehicleDB = async ({name, type, colour}: vehicle) => {

    try {
        const addVehicle = await prisma.vehicle.create({
            data: {
                name,
                type,
                colour
            }
        })

        return addVehicle
    } catch (error) {
        return null
    }
}

export const editVehicleDB = async (data: vehicle, id: number) => {

    try {
        const editVehicle = await prisma.vehicle.update({
            where: {
                id
            },
            data
        })

        return editVehicle
    } catch (error) {
        return null
    }
}

export const deleteVehicleDB = async (id: number) => {

    try {
        const deleteVehicle = await prisma.vehicle.delete({
            where: {
                id
            }
        })

        return deleteVehicle
    } catch (error) {
        return null
    }
}