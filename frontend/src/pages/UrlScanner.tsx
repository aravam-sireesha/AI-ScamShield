{result && (
  <div
    style={{
      marginTop: "20px",
      padding: "15px",
      borderRadius: "10px",
      fontWeight: "bold",
      background: result.includes("Safe") ? "#14532d" : "#7f1d1d",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    {result.includes("Safe") ? "✅" : "⚠️"} {result}
  </div>
)}