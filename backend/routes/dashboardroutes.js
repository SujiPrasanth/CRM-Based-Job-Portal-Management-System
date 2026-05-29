import express from 'express'
import  {dashboard}  from '../controller/dashboardcontoller.js'

const router = express.Router()

router.get('/dashboardoverview',dashboard)

export default router