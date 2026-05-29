import express from 'express'
import {isuser} from '../middleware/user.js'
import { applyjob, getappliedjob, getsavedjob, removejob, savejob } from '../controller/userjobcontroller.js'
const router = express.Router()

router.post('/applyjob',isuser,applyjob)
router.post('/savejob',isuser,savejob)

router.get('/getappliedjob',isuser,getappliedjob)
router.get('/getsavedjob',isuser,getsavedjob)
router.delete('/removesavedjob',isuser,removejob)
export default router