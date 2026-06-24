import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import EmailScanner from "./pages/EmailScanner";
import UrlScanner from "./pages/UrlScanner";
import JobScanner from "./pages/JobScanner";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <BrowserRouter>
      <div className={dark ? "dark bg-black text-white" : ""}>
        <div className="flex h-screen bg-gray-100 dark:bg-black">

          {/* SIDEBAR */}
          <Sidebar />

          {/* MAIN AREA */}
          <div className="flex-1 flex flex-col">

            {/* TOP BAR */}
            <div className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-900 shadow">
              <h1 className="font-bold text-lg">🛡️ ScamShield AI</h1>

              <button
                onClick={() => setDark(!dark)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
              >
                {dark ? "🌙 Dark" : "☀️ Light"}
              </button>
            </div>

            {/* PAGES */}
            <div className="p-6 overflow-y-auto flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/email" element={<EmailScanner />} />
                <Route path="/url" element={<UrlScanner />} />
                <Route path="/job" element={<JobScanner />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>

          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}