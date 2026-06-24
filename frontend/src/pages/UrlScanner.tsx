import { useState } from "react";
import { checkUrl } from "../services/api";

export default function UrlScanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);

    try {
      const data = await checkUrl(url);
      setResult(data);
    } catch (err) {
      setResult({ risk: "Error", message: "Backend not connected" });
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">🔗 URL Scam Detector</h1>

      {/* INPUT BOX */}
      <div className="bg-white p-6 rounded-xl shadow space-y-3">

        <input
          className="w-full p-3 border rounded"
          placeholder="Enter suspicious URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={handleCheck}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Analyze URL"}
        </button>

      </div>

      {/* RESULT BOX */}
      {result && (
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold mb-2">
            🧠 AI Result
          </h2>

          <p className="text-gray-700">
            Risk:{" "}
            <span
              className={
                result.risk === "High"
                  ? "text-red-500 font-bold"
                  : "text-green-600 font-bold"
              }
            >
              {result.risk}
            </span>
          </p>

          {result.message && (
            <p className="mt-2 text-sm text-gray-500">
              {result.message}
            </p>
          )}

        </div>
      )}

    </div>
  );
}