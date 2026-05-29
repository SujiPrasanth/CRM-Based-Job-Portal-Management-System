import express from 'express'
import { admindashboard, getapplication, getjobs, joborganizers, jobseekers } from "../controller/admincontroller.js"

const router = express.Router()

router.get('/jobseeker',jobseekers)
router.get('/joborganizer',joborganizers)
router.get('/jobs',getjobs)
router.get('/adminapplications',getapplication)
router.get('/admindashboard',admindashboard)

export default router