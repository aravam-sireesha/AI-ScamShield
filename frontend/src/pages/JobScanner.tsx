import React, { useState } from "react";

function JobScanner() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const scanJob = () => {
    if (!text.trim()) return;

    const scamKeywords = [
      "no experience",
      "pay upfront",
      "earn 10000 per day",
      "work from home unlimited income",
      "registration fee",
    ];

    const isScam = scamKeywords.some((word) =>
      text.toLowerCase().includes(word)
    );

    setResult(
      isScam
        ? "⚠️ Fake Job Alert: This looks like a SCAM"
        : "✅ Job looks LEGIT (No strong scam signals found)"
    );
  };

  return (
    <div style={styles.container}>
      <h1>💼 Job Scanner</h1>

      <textarea
        style={styles.textarea}
        placeholder="Paste job description here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button style={styles.button} onClick={scanJob}>
        Check Job
      </button>

      {result && (
        <div
          style={{
            ...styles.result,
            background: result.includes("SCAM") ? "#7f1d1d" : "#14532d",
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
}

const styles: any = {
  container: {
    padding: "30px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
  },
  textarea: {
    width: "100%",
    height: "150px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    marginTop: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 16px",
    background: "#f59e0b",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    color: "black",
    fontWeight: "bold",
  },
  result: {
    marginTop: "20px",
    padding: "15px",
    borderRadius: "8px",
  },
};

export default JobScanner;