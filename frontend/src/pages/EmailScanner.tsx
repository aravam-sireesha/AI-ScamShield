import React, { useState } from "react";

function EmailScanner() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const scanEmail = () => {
    if (!email) return;

    const suspicious = email.includes("urgent") || email.includes("bank");

    setResult(
      suspicious
        ? "⚠️ Scam Email Detected"
        : "✅ Email looks Safe"
    );
  };

  return (
    <div style={styles.container}>
      <h1>📧 Email Scanner</h1>

      <textarea
        style={styles.textarea}
        placeholder="Paste email content here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button style={styles.button} onClick={scanEmail}>
        Analyze Email
      </button>

      {result && <p style={styles.result}>{result}</p>}
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
    padding: "10px",
    borderRadius: "6px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
  result: {
    marginTop: "20px",
    fontSize: "18px",
  },
};

export default EmailScanner;