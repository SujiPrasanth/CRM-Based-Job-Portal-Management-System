import express from 'express'
import { createjob, deletejob, jobdata, jobdataid, updatejob } from '../controller/jobcontroller.js'
import {isorganizer} from '../middleware/organizer.js'
import upload from '../middleware/upload.js'
const router = express.Router()

router.post('/jobpost',isorganizer,upload.single('logo'),createjob)
router.get('/jobdata',isorganizer,jobdata)
router.get('/jobdata/:id',isorganizer,jobdataid)
router.patch('/jobpost/:id',isorganizer,upload.single('logo'),updatejob)
router.delete('/deletejob/:id',isorganizer,deletejob)
export default router