export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">

      <div className="p-5 bg-white shadow rounded">
        <h3 className="font-bold">Email Scans</h3>
        <p>Detect phishing emails</p>
      </div>

      <div className="p-5 bg-white shadow rounded">
        <h3 className="font-bold">URL Scans</h3>
        <p>Check malicious links</p>
      </div>

      <div className="p-5 bg-white shadow rounded">
        <h3 className="font-bold">Job Scams</h3>
        <p>Fake job detection</p>
      </div>

    </div>
  );
}