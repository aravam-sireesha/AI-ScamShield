import React from "react";

function Dashboard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛡️ AI ScamShield Dashboard</h1>

      <p style={styles.subtitle}>
        Real-time Scam Detection & Cybersecurity Intelligence System
      </p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>🔗 URL Scanner</h3>
          <p>Detect phishing & malicious links using AI analysis.</p>
        </div>

        <div style={styles.card}>
          <h3>📧 Email Scanner</h3>
          <p>Analyze suspicious emails for scam patterns.</p>
        </div>

        <div style={styles.card}>
          <h3>💼 Job Scanner</h3>
          <p>Verify fake job offers and recruitment scams.</p>
        </div>

        <div style={styles.card}>
          <h3>📊 Reports</h3>
          <p>View analytics and scam detection history.</p>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
  },
  title: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#94a3b8",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #334155",
  },
};

export default Dashboard;