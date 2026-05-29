import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import dotenv from 'dotenv'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import userrouter from './routes/userroutes.js'
import jobrouter from './routes/jobroutes.js'
import companyrouter from './routes/companyroutes.js'
import companyfetch from './routes/companyfetchroutes.js'
import userjobroutes from './routes/userjobroutes.js'
import organizerroutes from './routes/organizerroutes.js'
import dashboard  from './routes/dashboardroutes.js'
import adminrouter from './routes/adminroutes.js'

dotenv.config({ path: "./.env" });
const app = express()

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MomgoDB Connected Successfully");
    })
    .catch((err) => {
        console.log("Error", err)
    })

console.log("MONGO_URI:", process.env.MONGO_URI);

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }

))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            sameSite:"none",
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        }
    }
))

app.use('/uploads', express.static('uploads'))

app.use('/api', userrouter)
app.use('/api', jobrouter)
app.use('/api', companyrouter)
app.use('/api', companyfetch)
app.use('/api', userjobroutes)
app.use('/api',organizerroutes)
app.use('/api',dashboard)
app.use('/api',adminrouter)

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log("Server Connected Successfully")
})