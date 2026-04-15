import axios from 'axios'
//https://ai-resume-analyzer-h8rx.onrender.com
const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true // Cookies ke len-den ke liye
})

// 🚀 Har request mein token chipka kar bhejega (Cookies ya LocalStorage se utha kar)
api.interceptors.request.use((config) => {
    // 1. Pehle check karega ki kya koi token cookie mein hai
    let token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    
    // 2. Agar cookie mein nahi mila (kyunki browser ne block kiya ho), toh LocalStorage se check karega
    if (!token) {
        token = localStorage.getItem('token');
    }

    // 3. Agar kahin bhi token mil gaya, toh Authorization header mein bhej dega
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

    // Note: Interceptor apne aap isme headers jod dega!
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