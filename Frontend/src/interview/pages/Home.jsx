import React, { useState, useRef } from 'react'
import { useInterview } from '../../auth/hooks/useInterview'; // Folder structure ke hisaab se path check kar lena
import { useNavigate } from 'react-router'

const Home = () => {
    // --- Functionality Part ---
    const { loading, generateReport, reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("") 
    const [ fileName, setFileName ] = useState("") 
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        
        if(!jobDescription || !selfDescription || !resumeFile) {
            alert("Please fill all fields and upload your resume.");
            return;
        }
        
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if(data && data._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    if (loading) {
        return (
            <main className='min-h-screen bg-black text-white flex items-center justify-center'>
                <h1 className="text-2xl font-bold animate-pulse">Creating your interview plan...</h1>
            </main>
        )
    }

    // --- JSX Part (Super Compact Form) ---
    return (
        <div className="min-h-screen bg-black text-white px-6 py-6 flex items-center justify-center">
            {/* Main Container: 2 Columns on Desktop */}
            <div className="w-full max-w-[1500px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT SIDE: Super Compact Form (Takes 5 columns) */}
                <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                    <div className="mb-4">
                        <h1 className="text-2xl font-extrabold tracking-tight">AI Resume Analyzer</h1>
                        <p className="text-gray-400 mt-1 text-xs">Generate your personalized interview prep plan.</p>
                    </div>

                    <div className="space-y-4">
                        {/* Job Description Input */}
                        <div>
                            <label className="block mb-1 text-xs font-medium text-gray-400">Job Description</label>
                            <textarea 
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all h-[90px] resize-none text-sm scrollbar-thin scrollbar-thumb-white/10"
                                placeholder="Paste the job description here..."
                            />
                        </div>

                        {/* Self Description Input */}
                        <div>
                            <label className="block mb-1 text-xs font-medium text-gray-400">Self Description / About You</label>
                            <textarea 
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all h-[90px] resize-none text-sm scrollbar-thin scrollbar-thumb-white/10"
                                placeholder="Briefly describe your experience or paste your summary..."
                            />
                        </div>

                        {/* Resume Upload (Chota Design) */}
                        <div>
                            <label className="block mb-1 text-xs font-medium text-gray-400">Upload Resume (PDF)</label>
                            <input 
                                type="file" 
                                ref={resumeInputRef} 
                                onChange={handleFileChange}
                                accept=".pdf"
                                className="hidden" 
                                id="resume-upload" 
                            />
                            <label 
                                htmlFor="resume-upload" 
                                className="flex items-center justify-center gap-3 border border-dashed border-white/10 rounded-xl p-3 hover:border-indigo-500/50 hover:bg-white/5 transition-all cursor-pointer group"
                            >
                                <svg className="w-5 h-5 text-gray-500 group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                <p className="text-gray-400 text-xs group-hover:text-gray-200 transition-colors truncate max-w-[200px]">
                                    {fileName ? fileName : "Upload PDF resume"}
                                </p>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button 
                            onClick={handleGenerateReport}
                            className="w-full bg-indigo-600 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-500 active:scale-95 transition-all shadow-lg shadow-indigo-600/20"
                        >
                            Generate Plan →
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE: Reports/History (Takes 7 columns) */}
                <div className="lg:col-span-7 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm h-[480px] flex flex-col">
                    <div className="flex items-center justify-between mb-5 flex-shrink-0">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            Your Analysis History
                        </h2>
                        <span className="text-xs text-gray-500">{reports?.length || 0} plans</span>
                    </div>
                    
                    {/* Reports List - Limited height with internal scroll */}
                    <div className="space-y-3 overflow-y-auto flex-1 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                        {reports && reports.length > 0 ? (
                            reports.map((report) => (
                                <div 
                                    key={report._id}
                                    className="p-4 bg-black/20 border border-white/10 rounded-xl hover:border-indigo-500/30 hover:bg-black/40 transition-all group flex items-center justify-between gap-3"
                                >
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm truncate group-hover:text-indigo-300 transition-colors">
                                            {report.title || "Job Analysis Report"}
                                        </h3>
                                        <p className="text-[10px] text-gray-500 mt-0.5">
                                            {new Date(report.createdAt).toLocaleDateString('en-IN')}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <div className="text-right">
                                            <div className="text-[10px] text-indigo-400 font-medium">Score</div>
                                            <div className="text-base font-bold">{report.matchScore || 0}%</div>
                                        </div>
                                        <button 
                                            onClick={() => navigate(`/interview/${report._id}`)}
                                            className="p-2 bg-white/5 rounded-lg hover:bg-indigo-600/20 transition-colors"
                                        >
                                            <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Empty State
                            <div className="text-center py-14 border-2 border-dashed border-white/10 rounded-xl bg-black/10 flex-1 flex flex-col items-center justify-center">
                                <svg className="w-12 h-12 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                <h3 className="text-base font-semibold text-gray-400">No reports yet</h3>
                                <p className="text-xs text-gray-600 mt-1">Fill the form to generate your plan.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;