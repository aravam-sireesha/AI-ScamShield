import jsPDF from "jspdf";

export function generateReport(title: string, data: any) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("🛡️ ScamShield AI Report", 10, 10);

  doc.setFontSize(12);
  doc.text(`Type: ${title}`, 10, 20);

  doc.text(`Risk Score: ${data?.risk_score || "N/A"}%`, 10, 30);

  doc.text("Reasons:", 10, 40);

  let y = 50;
  (data?.reasons || ["AI analysis completed"]).forEach((r: string) => {
    doc.text(`- ${r}`, 10, y);
    y += 10;
  });

  doc.save("scamshield-report.pdf");
}