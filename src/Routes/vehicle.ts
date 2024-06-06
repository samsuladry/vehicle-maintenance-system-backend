import express from "express"
import { addVehicle, deleteVehicle, index, listOfVehicle, singleVehicle, updateVehicle } from "../Controller/vehicle"

const router = express.Router()

router.get('/', index)
router.get('/getVehicle', listOfVehicle)
router.get('/getVehicle/:id', singleVehicle)
router.post('/addVehicle', addVehicle)
router.patch('/updateVehicle/:id', updateVehicle)
router.delete('/deleteVehicle/:id', deleteVehicle)

export default router