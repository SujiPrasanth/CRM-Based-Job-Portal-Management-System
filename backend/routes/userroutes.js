import express from 'express'
import { checkuser, logout, registeruser } from '../controller/usercontroller.js'
import {isorganizer} from '../middleware/organizer.js'
import { isuser } from '../middleware/user.js'
import { preprofile, profiledata, profileupdate } from '../controller/profilecontroller.js'
import upload from '../middleware/upload.js'
const router = express.Router()

router.post('/signup',registeruser)
router.post('/signin',checkuser)
router.post('/logout',isorganizer,logout)
router.post('/userlogout',isuser,logout)
router.post('/adminlogout',logout)

router.get('/profile',isuser,profiledata)
router.patch('/profileupdate',isuser,upload.single('resume'),profileupdate)
router.get('/profiledata',isuser,preprofile)
export default router