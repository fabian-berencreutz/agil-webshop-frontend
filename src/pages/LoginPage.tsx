import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login, type User } from "../service/authService";

type LoginPageProps = {
  onLogin?: (user: User) => void;
};

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(username: string, password: string) {
    try {
      const loggedInUser = await login({
        username,
        password,
      });

      onLogin?.(loggedInUser);
      setMessage("Inloggning lyckades");

      const isAdmin = loggedInUser.roles.some(
        (role) => role === "ADMIN" || role === "ROLE_ADMIN",
      );

      if (isAdmin) {
        navigate("/private");
      } else {
        navigate("/products");
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
