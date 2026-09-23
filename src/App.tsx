import "./App.css";
import { useState } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { login } from "./service/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivatePage from "./pages/PrivatePage";
import WelcomePage from "./pages/WelcomePage";

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
      navigate("/welcome");
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
    <div className="app">
      <Header />

      <nav>
        <Link to="/">Hem</Link>{" "}
        <Link to="/products">Produkter</Link>{" "}
        <Link to="/login">Logga in</Link>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<h2>Välkommen</h2>} />

          <Route
            path="/products"
            element={<ProductsPage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/private"
            element={
              <ProtectedRoute>
                <PrivatePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
