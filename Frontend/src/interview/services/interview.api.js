import axios from 'axios'
//
const api = axios.create({
    baseURL: 'https://ai-resume-analyzer-h8rx.onrender.com',
    withCredentials: true
})


api.interceptors.request.use((config) => {
   
    let token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    
    
    if (!token) {
        token = localStorage.getItem('token');
    }

    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const generateInterviewReport = async ({jobDescription, selfDescription, resumeFile}) => {
    const formData = new FormData()
    formData.append('jobDescription', jobDescription)
    formData.append('selfDescription', selfDescription)
    formData.append('resume', resumeFile)

    
    const response = await api.post('/api/interview/', formData, {
        headers: {
             "Content-Type": 'multipart/form-data'
        }
    })
    return response.data
}

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
}

export const getAllInterviewReports = async () => {
    const response = await api.get('/api/interview/')
    
    return response.data
}