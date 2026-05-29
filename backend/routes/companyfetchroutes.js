import express from 'express'
import { companyfetchdata, companyfetchdatabyid } from '../controller/companyfetchdata.js'

const router = express.Router()

router.get('/fetchcompanydata',companyfetchdata)
router.get('/fetchcompanydata/:id',companyfetchdatabyid)

export default router