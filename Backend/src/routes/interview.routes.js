const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const interviewController = require('../controllers/interview.controller')
const upload = require('../middleware/file.middleware')

const interviewRouter = express.Router()

interviewRouter.post('/', authMiddleware.authUser, upload.single('resume'), interviewController.generateInterviewReportController)

interviewRouter.get('/report/:interviewId', authMiddleware.authUser, interviewController.getInterviewReportByIdController)

interviewRouter.get('/', authMiddleware.authUser, interviewController.getAllInterviewReportsController)


module.exports = interviewRouter