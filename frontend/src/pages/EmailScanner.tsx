import { useState } from "react";

export default function EmailScanner() {
  const [text, setText] = useState("");

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">

      <h1 className="text-xl font-bold">📧 Email Scanner</h1>

      <textarea
        className="w-full border p-3 rounded h-40"
        placeholder="Paste email here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Analyze
      </button>

    </div>
  );
}