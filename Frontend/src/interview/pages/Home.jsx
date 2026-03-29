const Home = () => {
  // ... (Aapka existing logic same rahega)

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 md:py-12">
      {/* Main Container: Mobile par 1 column, Desktop par 12 columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT SIDE: Form (Takes 7 columns on Desktop) */}
        <div className="lg:col-span-7 bg-white/5 border border-white/10 p-6 md:p-10 rounded-3xl backdrop-blur-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Submit Details</h1>
          <p className="text-gray-400 mb-8">Enter your info below.</p>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Job Description</label>
              <textarea 
                className="w-full bg-transparent border border-indigo-500/30 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[120px]"
                placeholder="Paste JD here..."
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Upload Resume</label>
              <div className="border-2 border-dashed border-indigo-500/30 rounded-2xl p-8 text-center hover:bg-white/5 transition-all cursor-pointer">
                <p className="text-gray-400 text-sm">Tap to upload PDF</p>
              </div>
            </div>

            <button className="w-full bg-indigo-600 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-500 active:scale-95 transition-all">
              Generate Plan
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Reports (Takes 5 columns on Desktop) */}
        <div id="report" className="lg:col-span-5 scroll-mt-24">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            History
          </h2>
          
          <div className="space-y-4">
            {reports.map((report) => (
              <div 
                key={report._id}
                className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-indigo-500/50 transition-all"
              >
                <h3 className="font-bold text-lg">{report.title}</h3>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full border border-indigo-400/20">
                    Match: {report.matchScore}%
                  </span>
                  <button className="text-sm font-medium text-gray-400 hover:text-white">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;