import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login, isAdmin } from "../service/authService";

const LoginPage = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(username: string, password: string) {
    try {
      await login({
        username,
        password,
      });

      setMessage("Inloggning lyckades");
      if (isAdmin()) {
        navigate("/private");
      } else {
        navigate("/");
      }
    } catch {
      setMessage("Fel användarnamn eller lösenord");
    }
  }

  return (
    <div>
      <h1>Logga in</h1>
      <LoginForm onSubmit={handleLogin} />
      <p>{message}</p>
    </div>
  );
};
export default LoginPage;
