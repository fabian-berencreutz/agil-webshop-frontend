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
    <header className="text-center bg-slate-800 text-white p-4">
      <h1 className="text-5xl">Webshop</h1>

      {user && (
        <div>
          <p>Inloggad som: {user.subject}</p>
          <p>Roll: {user.roles.join(", ")}</p>
          <button onClick={handleLogout} className="border rounded-lg m-4 p-1 cursor-pointer bg-blue-900 hover:bg-blue-800">Logga ut</button>
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
