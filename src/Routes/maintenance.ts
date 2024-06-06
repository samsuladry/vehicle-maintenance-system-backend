import express from "express"
import { addMaintenance, deleteMaintenance, index, listOfMaintenance, singleMaintenance, updateMaintenance } from "../Controller/maintenance"

const router = express.Router()

router.get('/', index)
router.get('/getMaintenance', listOfMaintenance)
router.get('/getMaintenance/:id', singleMaintenance)
router.post('/addMaintenance', addMaintenance)
router.patch('/updateMaintenance/:id', updateMaintenance)
router.delete('/deleteMaintenance/:id', deleteMaintenance)

export default router