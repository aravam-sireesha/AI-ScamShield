import { useState } from "react";

export default function Login({ onLogin }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h1 className="text-2xl font-bold mb-6 text-center">
          🛡️ ScamShield Login
        </h1>

        <input
          className="w-full p-2 border mb-3 rounded"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-4 rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => onLogin(username && password)}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

      </div>
    </div>
  );
}