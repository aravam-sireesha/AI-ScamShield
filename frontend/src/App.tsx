import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

import Dashboard from "./pages/Dashboard";
import UrlScanner from "./pages/UrlScanner";
import EmailScanner from "./pages/EmailScanner";
import JobScanner from "./pages/JobScanner";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/url" element={<UrlScanner />} />
          <Route path="/email" element={<EmailScanner />} />
          <Route path="/job" element={<JobScanner />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;