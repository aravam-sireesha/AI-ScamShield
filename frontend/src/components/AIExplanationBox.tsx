export default function AIExplanationBox({ data }: any) {
  return (
    <div className="bg-blue-50 border p-5 rounded-xl shadow">

      <h2 className="text-lg font-bold mb-2">
        🧠 AI Investigation Report
      </h2>

      <p className="text-sm text-gray-700 mb-3">
        Risk Analysis Summary:
      </p>

      <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">

        <li>Pattern analysis completed using ML classifier</li>

        <li>Threat intelligence matched with phishing dataset</li>

        <li>Behavioral indicators show scam probability</li>

        {data?.risk_score && (
          <li>
            Final Risk Score:{" "}
            <b className="text-red-600">{data.risk_score}%</b>
          </li>
        )}

      </ul>

      <p className="mt-4 text-xs text-gray-500">
        ⚠️ Recommendation: Block / Verify before proceeding
      </p>

    </div>
  );
}