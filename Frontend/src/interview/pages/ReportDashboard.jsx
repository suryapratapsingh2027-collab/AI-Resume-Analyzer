import React, { useState } from "react";
import { useInterview } from "../../auth/hooks/useInterview";

const ReportDashboard = () => {
  const [active, setActive] = useState("technical");
  const {report, loading} = useInterview()
  if (loading || !report) {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Loading Report...
    </div>
  )
}

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-5">
        <h1 className="text-xl font-bold mb-6 text-indigo-400">
          AI Report
        </h1>

        <nav className="space-y-3">
          {[
            { key: "technical", label: "Technical Questions" },
            { key: "behavioral", label: "Behavioral Questions" },
            { key: "skills", label: "Skill Gaps" },
            { key: "plan", label: "Preparation Plan" }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                active === item.key
                  ? "bg-indigo-600"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-6">

        {/* MATCH SCORE */}
        <div className="mb-6">
          <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg w-[130px]"><h2 className="text-red-600 font-medium" >Match Score</h2></div>
          <p className="text-4xl font-medium mt-5 text-yellow-400">
            {report.matchScore}%
          </p>
        </div>

        {/* TECHNICAL */}
        {active === "technical" && (
          <div className="space-y-4">
            {report.technicalQuestions.map((q, i) => (
              <div key={i} className="bg-gray-900 p-5 rounded-xl border border-gray-800">
                <h3 className="text-indigo-400 font-semibold mb-2">
                  {q.question}
                </h3>
                <p className="text-gray-400 mb-2">
                  <b className=" text-purple-600">Intention:</b> {q.intention}
                </p>
                <p className="text-gray-300">
                  <b className=" text-green-600">Answer:</b> {q.answer}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* BEHAVIORAL */}
        {active === "behavioral" && (
          <div className="space-y-4">
            {report.behavioralQuestions.map((q, i) => (
              <div key={i} className="bg-gray-900 p-5 rounded-xl border border-gray-800">
                <h3 className="text-indigo-400 font-semibold mb-2">
                  {q.question}
                </h3>
                <p className="text-gray-400 mb-2">
                  <b className=" text-purple-600">Intention:</b> {q.intention}
                </p>
                <p className="text-gray-300">
                  <b className=" text-green-600">Answer:</b> {q.answer}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* SKILLS */}
        {active === "skills" && (
          <div className="flex gap-3 flex-wrap">
            {report.skillGaps.map((s, i) => (
              <span
                key={i}
                className={`px-4 py-2 rounded-full text-sm ${
                  s.severity === "high"
                    ? "bg-red-500/20 text-red-400"
                    : s.severity === "medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {s.skill} ({s.severity})
              </span>
            ))}
          </div>
        )}

        {/* PLAN */}
        {active === "plan" && (
          <div className="space-y-4">
            {report.preprationPlan.map((d, i) => (
              <div key={i} className="bg-gray-900 p-5 rounded-xl border border-gray-800">
                <h3 className="text-indigo-400 font-semibold mb-2">
                  Day {d.day}: {d.focus}
                </h3>
                <ul className="list-disc list-inside text-gray-300">
                  {d.tasks.map((task, idx) => (
                    <li key={idx}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ReportDashboard;