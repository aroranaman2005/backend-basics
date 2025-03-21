// this file involves express setup

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit:"16mb"}))  // Middleware to parse JSON body
app.use(express.urlencoded({extended: true, limit: "16mb"}))
app.use(express.static("public")) //  middleware function that serves static files (like HTML, images) from the "public" folder.
app.use(cookieParser())

// router import
import userRouter from './routes/user.routes.js'

// routes declaration
app.use('/api/v1/users', userRouter)

//   https://localhost:8000/api/v1/users/register
export {app}