import express from 'express'
import { companydata } from '../controller/companycontroller.js'
import {isorganizer} from '../middleware/organizer.js'
import { getuserdata } from '../controller/profilecontroller.js'

const router = express.Router()

router.get('/companydata',isorganizer,companydata)
router.get('/getuserdata/:id',getuserdata)
export default router