import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getUser,
  isAdmin,
  isAuthenticated,
  logout,
} from "../service/authService";

function Header() {
  useLocation();

  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="header">
      <h1>Agil Webbshop</h1>

      {user && (
        <div>
          <p>Inloggad som: {user.subject}</p>
          <p>Roll: {user.roles.join(", ")}</p>
          <button onClick={handleLogout}>Logga ut</button>
        </div>
      )}

      <nav>
        <Link to="/">Hem</Link> <Link to="/products">Produkter</Link>{" "}
        {isAdmin() && (
          <>
            <Link to="/private">Adminpanel</Link>{" "}
          </>
        )}
        {!isAuthenticated() && <Link to="/login">Logga in</Link>}
      </nav>
    </header>
  );
}
export default Header;
