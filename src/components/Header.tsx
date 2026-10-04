import { useLocation } from "react-router-dom";
import { getUser } from "../service/authService";

function Header() {
  useLocation();

  const user = getUser();

  return (
    <header className="header">
      <h1>Agil Webbshop</h1>

      {user && (
        <div>
          <p>Inloggad som: {user.subject}</p>
          <p>Roll: {user.roles.join(", ")}</p>
        </div>
      )}
    </header>
  );
}

export default Header;
