import './App.css'
import { useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { login } from "./service/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivatePage from "./pages/PrivatePage";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await login({
        username,
        password,
      });

      setMessage("Inloggning lyckades");
      navigate("/private");
    } catch {
      setMessage("Fel användarnamn eller lösenord");
    }
  }

  return (
    <div>
      <h1>Logga in</h1>

      <input
        type="email"
        placeholder="E-post"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Logga in</button>

      <p>{message}</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/private"
        element={
          <ProtectedRoute>
            <PrivatePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;