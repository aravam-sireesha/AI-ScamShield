import React from "react";

function Reports() {
  return (
    <div style={styles.container}>
      <h1>📊 ScamShield Reports</h1>

      <div style={styles.card}>
        <h3>Total Scans</h3>
        <p>120</p>
      </div>

      <div style={styles.card}>
        <h3>Scams Detected</h3>
        <p>34</p>
      </div>

      <div style={styles.card}>
        <h3>Safe Items</h3>
        <p>86</p>
      </div>
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
  card: {
    background: "#1e293b",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
  },
};

export default Reports;