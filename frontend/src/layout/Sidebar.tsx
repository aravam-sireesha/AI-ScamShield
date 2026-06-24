import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-900 h-screen p-5 shadow">

      <h2 className="text-xl font-bold mb-6">🛡️ ScamShield</h2>

      <nav className="space-y-3">

        <NavLink
          to="/"
          className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/email"
          className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          📧 Email Scanner
        </NavLink>

        <NavLink
          to="/url"
          className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          🌐 URL Scanner
        </NavLink>

        <NavLink
          to="/job"
          className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          💼 Job Scanner
        </NavLink>

      </nav>
    </div>
  );
}