import { useState } from "react";
import { checkJob } from "../services/api";

export default function JobScanner() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    salary: "",
    description: ""
  });

  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    const data = await checkJob(job);
    setResult(data);
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">💼 Job Scam Detector</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-3">

        <input
          className="w-full p-2 border"
          placeholder="Job Title"
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />

        <input
          className="w-full p-2 border"
          placeholder="Company"
          onChange={(e) => setJob({ ...job, company: e.target.value })}
        />

        <input
          className="w-full p-2 border"
          placeholder="Salary"
          onChange={(e) => setJob({ ...job, salary: e.target.value })}
        />

        <textarea
          className="w-full p-2 border h-32"
          placeholder="Job Description"
          onChange={(e) => setJob({ ...job, description: e.target.value })}
        />

        <button
          onClick={handleCheck}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Analyze Job
        </button>

      </div>

      {result && (
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold">🧠 Risk Score</h2>

          <p className="text-3xl font-bold text-red-500">
            {result.risk_score || 0}%
          </p>

          {/* AI REASONS */}
          <div className="mt-4">
            <h3 className="font-semibold">Reasons:</h3>

            <ul className="list-disc ml-5 text-sm text-gray-700">
              {(result.reasons || []).map((r: string, i: number) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
}