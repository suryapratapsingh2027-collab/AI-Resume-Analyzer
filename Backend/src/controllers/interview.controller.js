const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')

async function generateInterviewReportController(req, res){

    const resumeContent = await pdfParse(req.file.buffer)
    const {selfDescription, jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })
    const title = jobDescription.split('\n')[0] || "Interview Report"

    const interviewReport = await interviewReportModel.create({
        title,
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: 'Interview report generated successfully',
        interviewReport
    })
}

async function getInterviewReportByIdController(req, res){
    const {interviewId} = req.params

    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message: 'Interview report not found'
        })
    }

    res.status(200).json({
        message: 'Interview report fetched successfully',
        interviewReport
    })
}

async function getAllInterviewReportsController(req, res){
    const interviewReports = await interviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select('title createdAt matchScore')
    res.status(200).json({
        message:'Interview report fetched successfully',
        interviewReports
    })
}


module.exports = {generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController}