import express from 'express'
import { isorganizer } from '../middleware/organizer.js'
import { getapplicants, jobapplications, updatestatus } from '../controller/applicationscontroller.js'

const router = express.Router()
router.get('/applications',isorganizer,jobapplications)
router.patch('/updatestatus/:id',isorganizer,updatestatus)
router.get('/applicants',isorganizer,getapplicants)
export default router