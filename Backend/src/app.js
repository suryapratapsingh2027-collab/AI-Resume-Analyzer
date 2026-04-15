const express = require('express')
const authRouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cookieParser())
//https://ai-resume-analyzer-1-trtc.onrender.com

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)


module.exports = app
